// Module Imports
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../../utility/firebase-modules/Firebase";

// Components Imports
import MainView from "../../components/MainView";
import font from "../../config/font";
import color from "../../config/color";

const HomeScreen = () => {
	return (
		<MainView>
			<Text style={styles.headerText}>
				Welcome Back{" "}
				{auth.currentUser.displayName !== null
					? auth.currentUser.displayName
					: "User"}
			</Text>
			<TouchableOpacity onPress={() => console.log(auth.currentUser)}>
				<Text>Test</Text>
			</TouchableOpacity>
		</MainView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	headerText: {
		fontFamily: font.fontFamily,
		fontSize: 30,
		marginVertical: 10,
		fontWeight: "bold",
		textAlign: "center",
		flexWrap: "wrap",
	},
});
