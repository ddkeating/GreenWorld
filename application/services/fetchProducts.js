// services/fetchProducts.js
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utility/firebase-modules/Firebase";

export const fetchProducts = async (queryText) => {
  try {
    // Reference to the Firestore collection
    const productsCollection = collection(db, "products");

    let productsQuery;

    if (queryText) {
      // Query for products where title contains the search query
      productsQuery = query(
        productsCollection,
        where("title", ">=", queryText),
        where("title", "<=", queryText + "\uf8ff") // To perform a range search
      );
    } else {
      // No queryText, return all products
      productsQuery = productsCollection;
    }

    // Get documents from the query
    const snapshot = await getDocs(productsQuery);

    // Map over documents to extract data
    const productsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return productsList;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};
