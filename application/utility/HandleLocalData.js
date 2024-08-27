import { retrieveDailyChallenges } from "./firebase-modules/DataHandling";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DAILY_CHALLENGES_KEY = "DAILY_CHALLENGES_KEY";
const LAST_UPDATE_KEY = "LAST_UPDATE_KEY";

export const getDailyChallenges = async () => {
	try {
		const storedChallenges = await AsyncStorage.getItem(DAILY_CHALLENGES_KEY);
		const lastUpdate = await AsyncStorage.getItem(LAST_UPDATE_KEY);
		const today = new Date().toISOString().split("T")[0];

		// Checks if there are stored challenges and if they were updated today.
		// Daily challenges should refresh every day.
		if (storedChallenges && lastUpdate === today) {
			return JSON.parse(storedChallenges);
		}

		// Otherwise, fetch new challenges
		const allChallenges = await retrieveDailyChallenges();
		if (allChallenges.length === 0) return []; // Handle case where there are no challenges available

		// Shuffle and select 3 random challenges
		// This is a simple way to randomize the challenges each day
		const shuffledChallenges = allChallenges.sort(() => 0.5 - Math.random());
		const dailyChallenges = shuffledChallenges.slice(0, 3);

		// Store the new challenges and the date
		await AsyncStorage.setItem(
			DAILY_CHALLENGES_KEY,
			JSON.stringify(dailyChallenges)
		);
		await AsyncStorage.setItem(LAST_UPDATE_KEY, today);

		return dailyChallenges;
	} catch (error) {
		console.error("Error getting daily challenges:", error);
	}
};
