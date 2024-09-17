// Modules Import
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";

// Components Import
import MainView from "../../components/MainView";
import NavigationBackBtn from "../../components/NavigationBackBtn";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Config Import
import color from "../../config/color";
import font from "../../config/font";
import { auth } from "../../utility/firebase-modules/Firebase";
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	updatePassword,
} from "firebase/auth";
import CustomBtn from "../../components/CustomBtn";
import LoadingOverlay from "../../components/Loading";

const PasswordChangeScreen = ({ navigation }) => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [showCurrentPassword, setShowCurrentPassword] = useState(false);

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState("");

	const handleUpdatePassword = async () => {
		setError("");
		setSuccessMsg("");
		setLoading(true);

		if (newPassword !== confirmPassword) {
			setError("Passwords do not match.");
			setLoading(false);
			return;
		}

		if (newPassword.length < 6) {
			setError("Password must be at least 6 characters long.");
			setLoading(false);
			return;
		}

		const currentUser = auth.currentUser;
		if (currentPassword) {
			const credential = EmailAuthProvider.credential(
				currentUser.email,
				currentPassword
			);

			setLoading(true);

			try {
				await reauthenticateWithCredential(currentUser, credential);

				await updatePassword(currentUser, newPassword);
				setSuccessMsg("Password updated successfully.");
			} catch (error) {
				if (error.code === "auth/wrong-password") {
					setError("Current password is incorrect");
				} else {
					setError("Failed to update password. Please try again later.");
				}
			}
		}

		setLoading(false);
	};
	return (
		<ScrollView>
			<MainView>
				<View style={styles.headerContainer}>
					<NavigationBackBtn navigation={navigation} color={color.primary} />
					<Text style={styles.headerText}>Change Password</Text>
				</View>
				<View style={styles.passwordContainer}>
					<Text style={styles.inputLabel}>Current Password</Text>
					<View style={styles.passwordInputContainer}>
						<TextInput
							style={styles.input}
							placeholder="Current Password"
							secureTextEntry={showCurrentPassword}
							value={currentPassword}
							onChangeText={setCurrentPassword}
						/>
						<TouchableOpacity
							onPress={() => setShowCurrentPassword(!showCurrentPassword)}
						>
							<Icon
								name={showCurrentPassword ? "eye" : "eye-off"}
								size={24}
								color={color.primary}
							/>
						</TouchableOpacity>
					</View>
					<Text style={styles.inputLabel}>New Password</Text>
					<View style={styles.passwordInputContainer}>
						<TextInput
							style={styles.input}
							placeholder="New Password"
							secureTextEntry={showCurrentPassword}
							value={newPassword}
							onChangeText={setNewPassword}
						/>
						<TouchableOpacity
							onPress={() => setShowCurrentPassword(!showCurrentPassword)}
						>
							<Icon
								name={showCurrentPassword ? "eye" : "eye-off"}
								size={24}
								color={color.primary}
							/>
						</TouchableOpacity>
					</View>
					<Text style={styles.inputLabel}>Confirm Password</Text>
					<View style={styles.passwordInputContainer}>
						<TextInput
							style={styles.input}
							placeholder="Confirm Password"
							secureTextEntry={showCurrentPassword}
							value={confirmPassword}
							onChangeText={setConfirmPassword}
						/>
						<TouchableOpacity
							onPress={() => setShowCurrentPassword(!showCurrentPassword)}
						>
							<Icon
								name={showCurrentPassword ? "eye" : "eye-off"}
								size={24}
								color={color.primary}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<Text style={[styles.errorText, { height: error !== "" ? "auto" : 0 }]}>
					{error}
				</Text>
				<Text
					style={[
						styles.errorText,
						{
							color: color.secondary,
							height: successMsg !== "" ? "auto" : 0,
						},
					]}
				>
					{successMsg}
				</Text>
				<CustomBtn
					title="Update Password"
					onPress={handleUpdatePassword}
					color={color.accent}
					textColor={color.black}
					fontSize={26}
				/>
				<LoadingOverlay isLoading={loading} />
			</MainView>
		</ScrollView>
	);
};

export default PasswordChangeScreen;

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},

	headerText: {
		fontSize: 28,
		color: color.primary,
		fontFamily: font.fontFamily,
		fontWeight: "light",
		marginLeft: 10,
	},

	passwordContainer: {
		marginTop: 10,
		flexDirection: "column",
		justifyContent: "center",
		marginBottom: 20,
	},

	inputLabel: {
		fontSize: 24,
		fontFamily: font.fontFamily,
		color: color.primary,
		marginHorizontal: 20,
	},

	passwordInputContainer: {
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
	errorText: {
		fontSize: 22,
		color: color.red,
		fontFamily: font.fontFamily,
		textAlign: "center",
		fontWeight: "bold",
		marginVertical: 10,
	},
});
