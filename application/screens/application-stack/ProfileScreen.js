import { ScrollView, StyleSheet, Text, Touchable, View } from "react-native";
import React, { useState, useEffect } from "react";
import { fetchMonthlyCarbonFootprintData } from "../../utility/firebase-modules/DataHandling";
import { auth } from "../../utility/firebase-modules/Firebase";
import { signOut } from "firebase/auth";
import CustomBtn from "../../components/CustomBtn";
import color from "../../config/color";
import font from "../../config/font";
import CarouselComponent from "../../components/Carousel";
import LoadingOverlay from "../../components/Loading";

const formatMonthYear = (month, year) => {
	// Create a date object with the given month and year
	const date = new Date(month); // month is 0-indexed in JavaScript Date
	// Format the date as "Feb 2024"
	const options = { month: "short", year: "numeric" };
	return date.toLocaleDateString("en-US", options);
};

const ProfileScreen = ({ navigation }) => {
	const [carouselItems, setCarouselItems] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCarbonData = async () => {
			try {
				setLoading(true);
				const monthlyData = await fetchMonthlyCarbonFootprintData();
				// Format the data for the carousel
				const formattedData = monthlyData.map((data) => ({
					title: formatMonthYear(data.month),
					description: data.totalCarbonFootprint,
				}));
				setCarouselItems(formattedData);
			} catch (error) {
				console.error("Error fetching monthly carbon data: ", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCarbonData();
	}, []);

	return (
		<ScrollView>
			<MainView>
				<Text style={styles.headerText}>Your Profile</Text>
				<View style={styles.userContainer}>
					<Text style={styles.userText}>{auth.currentUser.displayName}</Text>
					<Text style={styles.userText}>{auth.currentUser.email}</Text>
				</View>
				<View>
					<Text style={styles.carouselHeaderText}>
						Carbon Footprint Overview
					</Text>
					<CarouselComponent content={carouselItems} />
				</View>

				<View style={styles.btnContainer}>
					<CustomBtn
						title="Settings"
						onPress={() => navigation.navigate("Account Settings")}
						color={color.primary}
						textColor={color.white}
					/>
				</View>
				<LoadingOverlay isLoading={loading} />
			</MainView>
		</ScrollView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	headerText: {
		fontFamily: font.fontFamily,
		fontSize: 32,
		fontWeight: "light",
		color: color.primary,
		textAlign: "left",
		marginTop: 5,
	},

	userContainer: {
		flexDirection: "column",
		marginVertical: 10,
		gap: 5,
	},

	userText: {
		fontFamily: font.fontFamily,
		fontSize: 22,
		fontWeight: "light",
		color: color.primary,
		textAlign: "left",
	},

	carouselHeaderText: {
		fontFamily: font.fontFamily,
		fontSize: 28,
		fontWeight: "bold",
		color: color.primary,
		textAlign: "center",
		marginVertical: 10,
	},

	btnContainer: {
		marginVertical: 80,
	},
});
