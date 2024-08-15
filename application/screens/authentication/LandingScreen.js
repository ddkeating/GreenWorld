import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import font from "../../config/font";
import color from "../../config/color";
import CustomBtn from "../../components/CustomBtn";
import { TouchableOpacity } from "react-native-gesture-handler";

const LandingScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Image
				source={require("../../assets/images/landing.png")}
				style={styles.landingImg}
			/>
			<Text style={styles.headerText}>GreenWorld</Text>
			<View style={styles.btnContainer}>
				<CustomBtn
					title="Register"
					color={color.accent}
					textColor={color.black}
					onPress={() => navigation.navigate("Register")}
				/>
				<CustomBtn
					title="Login"
					color={color.secondary}
					textColor={color.white}
					onPress={() => navigation.navigate("Login")}
				/>
			</View>
			<View style={styles.textContainer}>
				<View style={styles.policyContainer}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Privacy Policy")}
					>
						<Text style={styles.policyText}>Privacy Policy</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate("Terms Of Service")}
					>
						<Text style={styles.policyText}>Terms of Service</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.copyrightText}>
					All rights reserved ©2024 Greenworld
				</Text>
			</View>
		</View>
	);
};

export default LandingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	headerText: {
		fontSize: 38,
		fontFamily: font.fontFamily,
		letterSpacing: 1.5,
		fontWeight: Platform.OS === "ios" ? "300" : "light",
		color: color.primary,
		textAlign: "center",
		padding: 20,
		textTransform: "uppercase",
	},
	btnContainer: {
		marginVertical: 20,
		gap: 10,
	},
	landingImg: {
		width: "100%",
		height: "50%",
	},
	textContainer: {
		marginTop: "auto",
		marginBottom: 40,
	},
	policyContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	policyText: {
		color: color.black,
		fontSize: 16,
		fontWeight: "400",
		textAlign: "center",
		marginVertical: 10,
	},
	copyrightText: {
		color: color.black,
		fontSize: 16,
		fontWeight: "400",
		textAlign: "center",
	},
});
