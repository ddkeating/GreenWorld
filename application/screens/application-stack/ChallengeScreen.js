// Module Imports
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Dimensions,
	TouchableOpacity,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Components Import
import CustomBtn from "../../components/CustomBtn";
import MainView from "../../components/MainView";

// Config Import
import color from "../../config/color";
import font from "../../config/font";
import LoadingOverlay from "../../components/Loading";
import { getDailyChallenges } from "../../utility/HandleLocalData";
import {
	fetchCheckedChallenges,
	fetchUserCompletedChallenges,
	updateUserCompletedChallenges,
} from "../../utility/firebase-modules/DataHandling";

export const ChallengeOverviewScreen = () => {
	const [challenges, setChallenges] = useState([]);
	const [totalChallenges, setTotalChallenges] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchChallenges = async () => {
			setLoading(true);
			try {
				const challengeProgression = await fetchUserCompletedChallenges();

				// Count occurrences of each challenge
				const challengeCountMap = {};
				challengeProgression.challenges.forEach((challenge) => {
					if (challengeCountMap[challenge.id]) {
						challengeCountMap[challenge.id].count += 1;
					} else {
						challengeCountMap[challenge.id] = { ...challenge, count: 1 };
					}
				});

				// Convert the map to an array
				const uniqueChallenges = Object.values(challengeCountMap);

				setChallenges(uniqueChallenges);
				setTotalChallenges(challengeProgression.totalCompleted);
			} catch (error) {
				console.error("Error retrieving challenges: ", error);
			}
			setLoading(false);
		};

		fetchChallenges();
	}, []);

	return (
		<ScrollView>
			<MainView>
				<Text style={styles.header}>Daily Challenges Overview</Text>
				<Text style={styles.challengesCompletedText}>
					Challenges Completed: {totalChallenges > 0 ? totalChallenges : 0}
				</Text>
				<View style={styles.challengesListView}>
					{challenges?.length > 0 ? (
						challenges.map((challenge, index) => (
							<View key={index} style={styles.completeChallengeContainer}>
								<Text style={styles.completeChallengeTitle}>
									{challenge.title}
								</Text>
								<Text style={styles.completeChallengeDescription}>
									{challenge.description}
								</Text>
								<Text style={styles.timesCompletedText}>
									Completed {challenge.count}{" "}
									{challenge.count > 1 ? "times" : "time"}
								</Text>
							</View>
						))
					) : (
						<Text style={styles.screenPrompt}>
							{loading
								? "Retrieving Challenges"
								: "Unable to retrieve challenges"}
						</Text>
					)}
				</View>

				<LoadingOverlay isLoading={loading} />
			</MainView>
		</ScrollView>
	);
};

export const ChallengeScreen = ({ navigation }) => {
	// State Variables
	const [dailyChallenges, setDailyChallenges] = useState([]);
	// Used to keep track of which challenges have been completed.
	const [checkedChallenges, setCheckedChallenges] = useState([]);
	const [showDescription, setShowDescription] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// When page first loads, fetch all challenges and see if they are already checked.
		const fetchChallenges = async () => {
			setLoading(true);
			try {
				// Get daily challenges from local storage.
				const challenges = await getDailyChallenges();
				setDailyChallenges(challenges);
				// Get checked challenges from firebase.
				const existingCheckedChallenges = await fetchCheckedChallenges();
				setCheckedChallenges(existingCheckedChallenges.map((c) => c.id));
			} catch (error) {
				setError(error);
			}
			setLoading(false);
		};

		fetchChallenges();
	}, []);

	// Function to handle when a challenge is checked
	const handleCheckedChallenge = async (challenge) => {
		if (checkedChallenges.includes(challenge.id)) return;
		setCheckedChallenges([...checkedChallenges, challenge.id]);

		try {
			// Update the user's completed challenges in firebase.
			await updateUserCompletedChallenges(challenge);
		} catch (error) {
			console.error(
				"There was an error updating the user's completed challenges: ",
				error
			);
		}
	};

	// Function to handle showing description of each individual challenge.
	const handleShowDescription = (challenge) => {
		// If the description is already showing, remove the index from the array.
		if (showDescription.includes(challenge.id)) {
			setShowDescription(showDescription.filter((i) => i !== challenge.id));
		} else {
			// Otherwise, if the description is not showing, add the index to the array.
			// If the challenge is completed, do not show the description and return.
			if (checkedChallenges.includes(challenge.id)) return;
			setShowDescription([...showDescription, challenge.id]);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<MainView>
				<Text style={styles.header}>Daily Challenges</Text>
				<View style={styles.challengesListView}>
					{dailyChallenges?.length > 0 ? (
						dailyChallenges.map((challenge) => (
							<TouchableWithoutFeedback
								key={challenge.id}
								onPress={() => handleShowDescription(challenge)}
							>
								<View>
									<ImageBackground
										style={[
											styles.challengeContainer,
											{
												opacity: checkedChallenges.includes(challenge.id)
													? 0.5
													: 1,
											},
										]}
										imageStyle={styles.challengeImg}
										source={require("../../assets/images/recycle.png")}
										resizeMode="cover"
									>
										<View
											style={[
												styles.titleContainer,
												{
													borderBottomLeftRadius: showDescription.includes(
														challenge.id
													)
														? 0
														: 10,
												},
												{
													borderBottomRightRadius: showDescription.includes(
														challenge.id
													)
														? 0
														: 10,
												},
											]}
										>
											<Text style={styles.challengeText}>
												{challenge.title}
											</Text>
											<TouchableOpacity
												style={styles.checkBtn}
												onPress={() => handleCheckedChallenge(challenge)}
											>
												<Icon
													name="check-bold"
													size={24}
													color={
														checkedChallenges.includes(challenge.id)
															? color.white
															: color.primary
													}
												/>
											</TouchableOpacity>
										</View>
									</ImageBackground>
									<View
										style={[
											styles.descriptionContainer,
											{
												height:
													showDescription.includes(challenge.id) &&
													!checkedChallenges.includes(challenge.id)
														? 60
														: 0,
											},
											{
												padding:
													showDescription.includes(challenge.id) &&
													!checkedChallenges.includes(challenge.id)
														? 10
														: 0,
											},
											{
												opacity: checkedChallenges.includes(challenge.id)
													? 0
													: 1,
											},
										]}
									>
										<Text style={styles.description}>
											{challenge.description}
										</Text>
									</View>
								</View>
							</TouchableWithoutFeedback>
						))
					) : (
						<Text>
							{loading
								? "Retrieving Challenges"
								: "An unexpected error occurred: " + error}
						</Text>
					)}
				</View>
				<View style={styles.btnContainer}>
					<CustomBtn
						title="Overview"
						textColor={color.black}
						color={color.accent}
						onPress={() => navigation.navigate("Challenge Overview")}
					/>
				</View>
				<LoadingOverlay isLoading={loading} />
			</MainView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	header: {
		fontSize: 24,
		fontWeight: "bold",
		fontFamily: font.fontFamily,
		color: color.primary,
		marginVertical: 20,
		textAlign: "center",
	},

	challengesListView: {
		display: "flex",
		flexDirection: "column",
		gap: 20,
		alignItems: "center",
	},
	challengeContainer: {
		shadowColor: color.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		height: Dimensions.get("window").height * 0.3,
		width: Dimensions.get("window").width * 0.9,
	},

	challengeImg: {
		borderRadius: 8,
	},

	titleContainer: {
		position: "absolute",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
		width: "100%",
		height: "25%",
		bottom: 0,
		backgroundColor: color.primary,
	},

	challengeText: {
		fontSize: 18,
		fontWeight: "bold",
		fontFamily: font.fontFamily,
		color: color.white,
	},

	checkBtn: {
		borderWidth: 2,
		borderColor: color.white,
		borderRadius: 999,
		padding: 2,
	},

	descriptionContainer: {
		backgroundColor: color.primary,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		width: Dimensions.get("window").width * 0.9,
	},

	description: {
		color: color.white,
		fontFamily: font.fontFamily,
		fontWeight: "light",
		fontSize: 14,
	},

	btnContainer: {
		marginTop: 40,
		marginBottom: 70,
	},

	challengesCompletedText: {
		fontSize: 18,
		fontFamily: font.fontFamily,
		fontWeight: "light",
		color: color.black,
		textAlign: "center",
		marginBottom: 10,
	},

	screenPrompt: {
		fontSize: 18,
		fontFamily: font.fontFamily,
		color: color.primary,
		marginTop: 20,
	},

	completeChallengeContainer: {
		backgroundColor: color.secondary,
		padding: 10,
		borderRadius: 10,
		width: "100%",
		marginVertical: 10,
	},

	completeChallengeTitle: {
		color: color.white,
		fontSize: 18,
		fontWeight: "bold",
		fontFamily: font.fontFamily,
		marginBottom: 10,
	},

	completeChallengeDescription: {
		color: color.white,
		fontSize: 16,
		fontFamily: font.fontFamily,
		marginBottom: 10,
	},

	timesCompletedText: {
		color: color.white,
		fontSize: 14,
		fontFamily: font.fontFamily,
	},
});
