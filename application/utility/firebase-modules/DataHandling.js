// This file is a collection of required request functions used to interact with the Firebase database.
import {
  collection,
  onSnapshot,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./Firebase";

const ARTICLEAPIKEY = "8dd77148739e45da83d1d7b94b489bd6";

// Function to fetch article data from the News API
export const fetchArticleData = async () => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=environmental&sortBy=publishedAt&searchIn=title&apiKey=${ARTICLEAPIKEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const subscribeToProducts = (callback) => {
  try {
    const productsCollectionRef = collection(db, "products");

    // Set up a real-time listener
    const unsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Call the callback with the updated products
      callback(products);
    });

    // Return the unsubscribe function to clean up the listener when needed
    return unsubscribe;
  } catch (error) {
    console.error("Error subscribing to products: ", error);
  }
};

export const retrieveDailyChallenges = async () => {
  try {
    // Reference to the specific document that contains the challenges
    const docRef = doc(db, "challenges", "options");
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Retrieve all the fields (which are the challenge maps)
      const challengesMap = docSnapshot.data();

      // Convert the map into an array of challenges
      const challenges = Object.keys(challengesMap).map((key) => ({
        id: key,
        ...challengesMap[key], // Spread each map (challenge) into an object
      }));

      return challenges;
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.error("Error retrieving challenges: ", error);
    return [];
  }
};

export const fetchUserCompletedChallenges = async () => {
  try {
    // If user is not logged in, return null
    if (!auth.currentUser) {
      console.error("User not logged in.");
      return;
    }

    // Reference to the specific document that contains the challenges
    const userProgressRef = collection(
      db,
      "user-progression",
      auth.currentUser.uid,
      "daily-challenges"
    );

    // Fetch the challenges from the user's document
    const snapshot = await getDocs(userProgressRef);
    const completedChallenges = [];

    // Iterate through the documents and add the challenges to the array
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data && data.challenges) {
        completedChallenges.push(...data.challenges);
      }
    });

    // Return the total number of completed challenges and the challenges themselves
    return {
      totalCompleted: completedChallenges.length,
      challenges: completedChallenges,
    };
  } catch (error) {
    console.error("Error fetching user challenges: ", error);
    return null;
  }
};

export const updateUserCompletedChallenges = async (challenge) => {
  try {
    if (auth.currentUser && challenge) {
      const userProgressRef = collection(
        db,
        "user-progression",
        auth.currentUser.uid,
        "daily-challenges"
      );

      const today = new Date().toISOString().split("T")[0];
      const todayChallengesRef = doc(userProgressRef, today);

      // Fetch the existing challenges for today
      const todayChallengesDoc = await getDoc(todayChallengesRef);
      let existingChallenges = [];

      // Check if the document exists and contains a valid challenges array
      if (todayChallengesDoc.exists()) {
        const data = todayChallengesDoc.data();
        if (Array.isArray(data.challenges)) {
          existingChallenges = data.challenges;
        }
      }

      // Ensure the new challenge is an object or array before merging
      const updatedChallenges = Array.isArray(existingChallenges)
        ? [...existingChallenges, challenge]
        : [challenge];

      // Update Firestore with the merged challenges list
      await setDoc(
        todayChallengesRef,
        {
          challenges: updatedChallenges,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      console.log("Challenges Updated!");
    } else {
      console.error("User not logged in or no challenges to update.");
    }
  } catch (error) {
    console.error("Error updating user challenges: ", error);
  }
};

export const fetchCheckedChallenges = async () => {
  try {
    // If the user is not logged in, then return null.
    if (!auth.currentUser) return;
    // Reference to the specific document that contains the challenges
    const userProgressRef = collection(
      db,
      "user-progression",
      auth.currentUser.uid,
      "daily-challenges"
    );
    const today = new Date().toISOString().split("T")[0];
    const todayChallengesRef = doc(userProgressRef, today);
    // Fetch the existing challenges for today
    const todayChallengesDoc = await getDoc(todayChallengesRef);

    // Check if the document exists and contains a valid challenges array
    if (todayChallengesDoc.exists()) {
      const data = todayChallengesDoc.data();
      return data.challenges;
    }
    return [];
  } catch (error) {
    console.log(
      "There was an error fetching today's checked challenges: ",
      error
    );
  }
};
