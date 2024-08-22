import {
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	Platform,
	Dimensions,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useState } from "react";

// Authentication Imports
import { auth } from "../../utility/firebase-modules/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// Components Import
import CustomBtn from "../../components/CustomBtn";
import LoadingOverlay from "../../components/Loading";

// Config Imports
import font from "../../config/font";
import color from "../../config/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FirebaseErrorHandling from "../../utility/firebase-modules/FirebaseErrorHandling";

// Register Screen Component for User Registration.
const RegisterScreen = ({ navigation }) => {
	// State Variables for Register Screen.
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [termsAccepted, setTermsAccepted] = useState(false);

	const [secureTextEntry, setSecureTextEntry] = useState(true);

	// State Variables for Error Handling and Loading Overlay.
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// Function to handle user registration via Firebase Auth API.
	const handleRegister = async () => {
		if (!username || !email || !password || !confirmPassword) {
			setError("Please fill in all fields");
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (!termsAccepted) {
			setError("Please accept the terms and conditions");
			return;
		}
		setError("");
		setLoading(true);

		// Firebase Auth API call to create a new user account.
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const firebaseUser = userCredential.user;

			await updateProfile(firebaseUser, {
				displayName: username,
			});
		} catch (error) {
			setError(FirebaseErrorHandling(error));
		}
		setLoading(false);
	};

	return (
		<ScrollView style={styles.container}>
			<KeyboardAvoidingView
				behavior="position"
				style={styles.avoidingViewContainer}
				keyboardVerticalOffset={Dimensions.get("screen").height * -0.11}
			>
				<Text style={styles.headerText}>Greenworld</Text>

				<Text style={styles.inputLabel}>Name</Text>
				<View style={styles.inputContainer}>
					<TextInput
						textContentType="name"
						style={styles.inputField}
						placeholder="Name"
						value={username}
						onChangeText={(text) => setUsername(text)}
						keyboardType="default"
					/>
					<Icon name="account" size={24} color={color.primary} />
				</View>
				<Text style={styles.inputLabel}>Email</Text>
				<View style={styles.inputContainer}>
					<TextInput
						textContentType="emailAddress"
						style={styles.inputField}
						placeholder="Email"
						value={email}
						onChangeText={(text) => setEmail(text)}
						keyboardType="email-address"
					/>
					<Icon name="email" size={24} color={color.primary} />
				</View>
				<Text style={styles.inputLabel}>Password</Text>
				<View style={styles.inputContainer}>
					<TextInput
						textContentType="oneTimeCode"
						style={styles.inputField}
						placeholder="Password"
						value={password}
						onChangeText={(text) => setPassword(text)}
						secureTextEntry={secureTextEntry}
					/>
					<TouchableOpacity
						onPress={() => setSecureTextEntry(!secureTextEntry)}
					>
						<Icon
							name={!secureTextEntry ? "eye" : "eye-off"}
							size={24}
							color={color.primary}
						/>
					</TouchableOpacity>
				</View>
				<Text style={styles.inputLabel}>Confirm Password</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputField}
						placeholder="Password"
						value={confirmPassword}
						onChangeText={(text) => setConfirmPassword(text)}
						secureTextEntry={secureTextEntry}
					/>
					<TouchableOpacity
						onPress={() => setSecureTextEntry(!secureTextEntry)}
					>
						<Icon
							name={!secureTextEntry ? "eye" : "eye-off"}
							size={24}
							color={color.primary}
						/>
					</TouchableOpacity>
				</View>
				{error ? (
					<Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
				) : null}
				<View style={styles.termsTextAndBtn}>
					<View style={styles.termsContainer}>
						<Text style={styles.termsText}>I agree with the </Text>
						<TouchableOpacity
							onPress={() => navigation.navigate("Terms Of Service")}
						>
							<Text style={styles.termsBold}>terms and conditions</Text>
						</TouchableOpacity>
						<Text style={styles.termsText}>outlined by this application.</Text>
					</View>
					<TouchableOpacity
						style={styles.checkBox}
						onPress={() => setTermsAccepted(!termsAccepted)}
					>
						<Icon
							name={
								termsAccepted ? "checkbox-marked" : "checkbox-blank-outline"
							}
							size={28}
							color={color.primary}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.btnContainer}>
					<CustomBtn
						title="Register"
						color={color.accent}
						textColor={color.black}
						onPress={handleRegister}
					/>
				</View>
			</KeyboardAvoidingView>
			<LoadingOverlay isLoading={loading} />
		</ScrollView>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
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

	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 20,
		marginTop: 10,
		marginBottom: 20,
		borderWidth: 2,
		borderRadius: 5,
		borderColor: color.primary,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},

	inputField: {
		fontSize: 24,
		fontFamily: font.fontFamily,
		color: color.primary,
		width: "80%",
	},

	inputLabel: {
		fontSize: 24,
		fontFamily: font.fontFamily,
		color: color.primary,
		marginHorizontal: 20,
	},

	termsTextAndBtn: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		marginVertical: 10,
	},

	checkBox: {
		alignItems: "flex-end",
	},

	termsContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flexWrap: "wrap",
		width: "80%",
	},

	termsBold: {
		fontSize: 16,
		fontFamily: font.fontFamily,
		color: color.black,
		fontWeight: "bold",
	},

	termsText: {
		fontSize: 16,
		fontFamily: font.fontFamily,
		color: color.black,
		fontWeight: "light",
	},

	btnContainer: {
		marginVertical: Dimensions.get("screen").height * 0.05,
	},
});
