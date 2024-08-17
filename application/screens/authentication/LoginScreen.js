// Module Imports
import {
	StyleSheet,
	Text,
	View,
	Image,
	Platform,
	TextInput,
	KeyboardAvoidingView,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Component Imports
import CustomBtn from "../../components/CustomBtn";
import LoadingOverlay from "../../components/Loading";

// Authentication Imports
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utility/firebase-modules/Firebase";

// Config Imports
import font from "../../config/font";
import color from "../../config/color";
import FirebaseErrorHandling from "../../utility/firebase-modules/FirebaseErrorHandling";

const LoginScreen = ({ navigation }) => {
	// State Variables for Login Screen
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	// State Variables for Error Handling and Loading Overlay
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// Function to handle user login via Firebase Auth API.
	const handleLogin = async () => {
		if (!email || !password) {
			setError("Please fill in all fields");
			return;
		}
		setError("");
		setLoading(true);

		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			setError(FirebaseErrorHandling(error));
		}
		setLoading(false);
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior="position">
				<Image
					source={require("../../assets/images/landing.png")}
					style={styles.landingImg}
					resizeMode="cover"
				/>

				<Text style={styles.headerText}>GreenWorld</Text>
				<View style={styles.loginContainer}>
					<Text style={styles.inputLabel}>Email</Text>
					<View style={styles.inputContainer}>
						<TextInput
							autoComplete="email"
							placeholder="Email"
							onChangeText={(text) => setEmail(text)}
							style={styles.input}
							keyboardType="email-address"
							value={email}
						/>
						<Icon name="email" size={24} color={color.primary} />
					</View>
					<Text style={styles.inputLabel}>Password</Text>
					<View style={styles.inputContainer}>
						<TextInput
							textContentType="password"
							autoCapitalize="none"
							placeholder="Password"
							onChangeText={(text) => setPassword(text)}
							style={styles.input}
							secureTextEntry={showPassword}
							value={password}
						/>
						<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
							<Icon
								name={!showPassword ? "eye" : "eye-off"}
								size={24}
								color={color.primary}
							/>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate("Password Reset")}
					>
						<Text style={styles.passwordForgetText}>Forgot your password</Text>
					</TouchableOpacity>
					{error ? (
						<Text style={{ color: color.red, textAlign: "center" }}>
							{error}
						</Text>
					) : null}
					<View style={styles.btnContainer}>
						<CustomBtn
							title="Login"
							color={color.secondary}
							textColor={color.white}
							onPress={handleLogin}
						/>
					</View>
				</View>
			</KeyboardAvoidingView>
			<LoadingOverlay isLoading={loading} />
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	landingImg: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height * 0.35,
		transform: [{ translateY: -Dimensions.get("window").height * 0.05 }],
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

	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 20,
		marginVertical: 10,
		borderWidth: 2,
		borderRadius: 5,
		borderColor: color.primary,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},

	input: {
		fontSize: 24,
		fontFamily: font.fontFamily,
		color: color.primary,
		width: "80%",
		flexGrow: 1,
	},

	inputLabel: {
		fontSize: 24,
		fontFamily: font.fontFamily,
		color: color.primary,
		marginHorizontal: 20,
	},

	passwordForgetText: {
		fontSize: 16,
		fontFamily: font.fontFamily,
		color: color.primary,
		textAlign: "right",
		marginHorizontal: 20,
		marginBottom: 5,
	},

	btnContainer: {
		marginVertical: 20,
	},
});
