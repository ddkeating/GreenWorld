import { ScrollView, StyleSheet, Text, Touchable, View } from "react-native";
import React from "react";

import { auth } from "../../utility/firebase-modules/Firebase";
import { signOut } from "firebase/auth";
import CustomBtn from "../../components/CustomBtn";
import color from "../../config/color";
import font from "../../config/font";
import CarouselComponent from "../../components/Carousel";

const carouselItems = [
	{
		title: "Carbon Footprint Tracker",
		route: "Tracker",
	},
];

const ProfileScreen = ({ navigation }) => {
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
					<CarouselComponent content={carouselItems} navigation={navigation} />
				</View>

				<View style={styles.btnContainer}>
					<CustomBtn
						title="Settings"
						onPress={() => navigation.navigate("Account Settings")}
						color={color.primary}
						textColor={color.white}
					/>
				</View>
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
