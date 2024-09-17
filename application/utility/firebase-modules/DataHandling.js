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
const CARBONAPIKEY = "WEqC9er6NotE18AIrY45Q";

export const fetchMonthlyCarbonFootprintData = async () => {
	const user = auth.currentUser;
	const carbonFootprintRef = collection(
		db,
		"user-progression",
		user.uid,
		"carbon-footprint"
	);

	try {
		const snapshot = await getDocs(carbonFootprintRef);
		const data = [];
		snapshot.forEach((doc) => {
			data.push({
				month: doc.id,
				totalCarbonFootprint: doc.data().carbonFootprint,
			});
		});

		return data;
	} catch (error) {
		console.error("Error fetching monthly carbon footprint data: ", error);
		return [];
	}
};

export const fetchCarbonFootprintData = async () => {
	try {
		if (auth.currentUser) {
			const userProgressRef = collection(
				db,
				"user-progression",
				auth.currentUser.uid,
				"carbon-footprint"
			);
			const snapshot = await getDocs(userProgressRef);
			const data = [];
			snapshot.forEach((doc) => {
				data.push(doc.data());
			});

			return data;
		}
	} catch (error) {
		console.error("Error fetching carbon footprint data: ", error);
	}
};

export const setCarbonFootprintData = async (data) => {
	try {
		if (auth.currentUser) {
			const today = new Date().toISOString().split("T")[0];
			const userProgressRef = collection(
				db,
				"user-progression",
				auth.currentUser.uid,
				"carbon-footprint"
			);
			const userFootprintRef = doc(userProgressRef, today);

			// Await the getDoc() to resolve the promise
			const userFootprintDoc = await getDoc(userFootprintRef);

			// Check if the document exists before accessing its data
			if (userFootprintDoc.exists()) {
				// Add the new carbon footprint value to the existing one
				await setDoc(
					userFootprintRef,
					{ carbonFootprint: userFootprintDoc.data().carbonFootprint + data },
					{ merge: true }
				);
			} else {
				// Create a new document if it doesn't exist
				await setDoc(
					userFootprintRef,
					{ carbonFootprint: data },
					{ merge: true }
				);
			}

			console.log("Data added successfully!");
		}
	} catch (error) {
		console.error("Error adding carbon footprint data: ", error);
	}
};

export const calculateCarbonTransportation = async ({ distance, mode }) => {
	try {
		const response = await fetch(
			"https://www.carboninterface.com/api/v1/estimates",
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${CARBONAPIKEY}`,
				},
				method: "POST",
				body: JSON.stringify({
					type: "vehicle",
					distance_unit: mode,
					distance_value: distance,
					vehicle_model_id: "7268a9b7-17e8-4c8d-acca-57059252afe9",
				}),
			}
		);
		const data = await response.json();
		return data.data.attributes.carbon_mt;
	} catch (error) {
		console.log("Encounter an error while fetching carbon data: ", error);
	}
};

export const calculateCarbonFlight = async ({ flightData, passengers }) => {
	try {
		const response = await fetch(
			"https://www.carboninterface.com/api/v1/estimates",
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${CARBONAPIKEY}`,
				},
				method: "POST",
				body: JSON.stringify({
					type: "flight",
					legs: [
						{
							departure_airport: flightData.departure_airport,
							destination_airport: flightData.destination_airport,
						},
					],
					passengers: passengers,
				}),
			}
		);
		const data = await response.json();

		return data.data.attributes.carbon_mt;
	} catch (error) {
		console.log("Encounter an error while fetching carbon data: ", error);
	}
};

export const calculateCarbonElectricity = async ({
	measurementUnit,
	dailyPowerUsage,
}) => {
	try {
		const response = await fetch(
			"https://www.carboninterface.com/api/v1/estimates",
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${CARBONAPIKEY}`,
				},
				method: "POST",
				body: JSON.stringify({
					type: "electricity",
					electricity_unit: measurementUnit,
					electricity_value: dailyPowerUsage,
					country: "us",
				}),
			}
		);
		const data = await response.json();
		return data.data.attributes.carbon_mt;
	} catch (error) {
		console.log("Encounter an error while fetching carbon data: ", error);
	}
};
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

export const getUserSettings = async () => {
	try {
		if (auth.currentUser) {
			const userSettingsRef = doc(db, "user-settings", auth.currentUser.uid);
			const userSettingsDoc = await getDoc(userSettingsRef);

			if (userSettingsDoc.exists()) {
				return userSettingsDoc.data();
			} else {
				console.log("No such document!");
				return null;
			}
		} else {
			console.error("User not logged in.");
			return null;
		}
	} catch (error) {
		console.error("Error retrieving user settings: ", error);
		return null;
	}
};

export const handleUserSettings = async (settings) => {
	try {
		if (auth.currentUser) {
			const userSettingsRef = doc(db, "user-settings", auth.currentUser.uid);
			await setDoc(userSettingsRef, settings, { merge: true });
			console.log("Settings Updated!");
		} else {
			console.error("User not logged in.");
			return;
		}
	} catch (error) {
		console.error("Error updating user settings: ", error);
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
