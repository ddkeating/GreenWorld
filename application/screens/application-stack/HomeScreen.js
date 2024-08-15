// Module Imports
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../../utility/firebase-modules/Firebase";

// Components Imports
import MainView from "../../components/MainView";
import font from "../../config/font";
import color from "../../config/color";

const HomeScreen = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
		return unsubscribe;
	}, []);

	return (
		<MainView>
			<Text style={styles.headerText}>
				Welcome Back {user ? user.displayName : "User"}
			</Text>
		</MainView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	headerText: {
		fontFamily: font.fontFamily,
		fontSize: 34,
		fontWeight: "bold",
		textAlign: "center",
		flexWrap: "wrap",
	},
});
