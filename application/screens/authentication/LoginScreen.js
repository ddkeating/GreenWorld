import {
	StyleSheet,
	Text,
	View,
	Image,
	Platform,
	TextInput,
	KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Component Imports
import CustomBtn from "../../components/CustomBtn";

// Config Imports
import font from "../../config/font";
import color from "../../config/color";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = () => {
		console.log(email, password);
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior="position">
				<Image
					source={require("../../assets/images/landing.png")}
					style={styles.landingImg}
				/>

				<Text style={styles.headerText}>GreenWorld</Text>
				<View style={styles.loginContainer}>
					<Text style={styles.inputLabel}>Email</Text>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder="Email"
							onChangeText={(text) => setEmail(text)}
							style={styles.input}
						/>
						<Icon name="email" size={24} color={color.primary} />
					</View>
					<Text style={styles.inputLabel}>Password</Text>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder="Password"
							onChangeText={(text) => setPassword(text)}
							style={styles.input}
							secureTextEntry={showPassword}
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
		width: "100%",
		height: "50%",
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
		marginVertical: 30,
	},
});
