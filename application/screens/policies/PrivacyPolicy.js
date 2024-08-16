import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import font from "../../config/font";
import color from "../../config/color";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyPolicy = () => {
	return (
		<MainView>
			<View style={styles.container}>
				<Text style={styles.headerText}>Privacy Policy</Text>
				<Text style={styles.privacyContent}>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat
					possimus earum sequi aspernatur qui, laboriosam, natus et culpa
					quibusdam id nulla magnam neque modi ex voluptates veritatis fuga.
					Facere, itaque!
				</Text>
			</View>
		</MainView>
	);
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
	container: {
		marginTop: Dimensions.get("window").height * 0.12,
	},

	headerText: {
		fontSize: 28,
		font: font.fontFamily,
		color: color.black,
		textAlign: "left",
		fontWeight: "light",
		marginVertical: 10,
	},

	privacyContent: {
		fontFamily: font.fontFamily,
		fontSize: 16,
		color: color.primary,
		textAlign: "left",
	},
});
