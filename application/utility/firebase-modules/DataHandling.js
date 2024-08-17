// This file is a collection of required request functions used to interact with the Firebase database.

import { auth, db } from "./Firebase";
const articleAPIKey = "8dd77148739e45da83d1d7b94b489bd6";

export const fetchArticleData = async () => {
	try {
		const response = await fetch(
			`https://newsapi.org/v2/everything?q=environmental&sortBy=publishedAt&searchIn=title&apiKey=${articleAPIKey}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
