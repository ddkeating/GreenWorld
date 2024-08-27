import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	updateProfile,
} from "firebase/auth";

// Components Import
import NavigationBackBtn from "../../components/NavigationBackBtn";
import CustomBtn from "../../components/CustomBtn";
import LoadingOverlay from "../../components/Loading";

// Config Imports
import color from "../../config/color";
import font from "../../config/font";
import MainView from "../../components/MainView";
import { auth } from "../../utility/firebase-modules/Firebase";

export default SettingsStack = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="Settings"
		>
			<Stack.Screen name="Settings" component={SettingsScreen} />
			<Stack.Screen name="Profile Details" component={ProfileDetails} />
			<Stack.Screen
				name="Notification Settings"
				component={NotificationSettings}
			/>
		</Stack.Navigator>
	);
};

const SettingsScreen = ({ navigation }) => {
	return (
		<ScrollView>
			<MainView>
				<View style={styles.headerContainer}>
					<NavigationBackBtn navigation={navigation} color={color.primary} />
					<Text style={styles.headerText}>Settings</Text>
				</View>
				<View style={styles.settingsList}>
					<TouchableOpacity
						style={styles.settingsItem}
						onPress={() => navigation.navigate("Profile Details")}
					>
						<Icon name="account" size={32} color={color.primary} />
						<Text style={styles.settingsText}>Account Details</Text>
						<Icon
							name="chevron-right"
							size={36}
							color={color.primary}
							style={styles.arrowRight}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.settingsItem}>
						<Icon name="bell" size={32} color={color.primary} />
						<Text style={styles.settingsText}>Notifications</Text>
						<Icon
							name="chevron-right"
							size={36}
							color={color.primary}
							style={styles.arrowRight}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.settingsItem}
						onPress={() => auth.signOut()}
					>
						<Icon name="logout" size={32} color={color.primary} />
						<Text style={styles.settingsText}>Logout</Text>
						<Icon
							name="chevron-right"
							size={36}
							color={color.primary}
							style={styles.arrowRight}
						/>
					</TouchableOpacity>
				</View>
			</MainView>
		</ScrollView>
	);
};

const ProfileDetails = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [successMsg, setSuccessMsg] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const currentUser = auth.currentUser;
		if (currentUser) {
			setName(currentUser.displayName);
			setEmail(currentUser.email);
		}
		setLoading(false);
	}, []);

	const validateEmail = (email) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	const handleReauthentication = async (email, password) => {
		const credential = EmailAuthProvider.credential(email, password);
		try {
			await reauthenticateWithCredential(auth.currentUser, credential);
		} catch (error) {
			setError("Reauthentication Failed, please try again.");
			setLoading(false);
		}
	};

	const handleDeleteAccount = async () => {
		if (auth.currentUser) {
			await auth.currentUser.delete();
		}
	};
	const handleUpdateProfile = async () => {
		setLoading(true);
		setError("");
		setSuccessMsg("");

		// Validate inputs
		if (!name.trim()) {
			setError("Please enter a valid name");
			setLoading(false);
			return;
		}
		if (!email.trim() || !validateEmail(email)) {
			setError("Please enter a valid email");
			setLoading(false);
			return;
		}

		// If there are no changes to the name or email
		if (
			auth.currentUser.email === email &&
			auth.currentUser.displayName === name
		) {
			setError("Please enter a new email or name");
			setLoading(false);
			return;
		}

		try {
			// Prompt the user for their password
			Alert.prompt(
				"Password",
				"Please enter your password to update the profile",
				[
					{
						text: "Cancel",
						style: "cancel",
						onPress: () => setLoading(false), // Stop loading if cancelled
					},
					{
						text: "OK",
						onPress: async (password) => {
							// Attempt reauthentication
							const reauthSuccess = await handleReauthAndUpdate(password);
							if (reauthSuccess) {
								// If reauthentication is successful, proceed with the update
								await updateProfile(auth.currentUser, {
									displayName: name,
									email: email,
								});
								setSuccessMsg("Profile updated successfully.");
							}
							setLoading(false);
						},
					},
				]
			);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	// Separate function for reauthentication and update
	const handleReauthAndUpdate = async (password) => {
		try {
			await handleReauthentication(auth.currentUser.email, password);
			return true; // Reauthentication successful
		} catch (error) {
			setError("Reauthentication failed. Please enter the correct password.");
			return false; // Reauthentication failed
		}
	};

	return (
		<ScrollView>
			<MainView>
				<View style={styles.headerContainer}>
					<NavigationBackBtn navigation={navigation} color={color.primary} />
					<Text style={styles.headerText}>Profile Details</Text>
				</View>
				<View>
					<Text style={styles.inputLabel}>Name</Text>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder="Name"
							placeholderTextColor={color.primary}
							value={name}
							onChangeText={(text) => setName(text)}
						/>
					</View>
					<Text style={styles.inputLabel}>Email</Text>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder="Email"
							placeholderTextColor={color.primary}
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
					</View>
					<Text
						style={[styles.errorText, { height: error !== "" ? "auto" : 0 }]}
					>
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
				</View>

				<View style={styles.updateBtnContainer}>
					<CustomBtn
						color={color.primary}
						textColor={color.white}
						title="Update Profile"
						onPress={handleUpdateProfile}
					/>
				</View>

				<View style={styles.otherBtnsContainer}>
					<View style={styles.changePasswordBtn}>
						<CustomBtn
							color={color.primary}
							textColor={color.white}
							title="Change Password"
							onPress={() => navigation.navigate("Change Password")}
							fontSize={26}
						/>
					</View>
					<View style={styles.deleteAccountBtn}>
						<CustomBtn
							color={color.red}
							textColor={color.white}
							title="Delete Account"
							onPress={handleDeleteAccount}
							fontSize={26}
						/>
					</View>
				</View>
				<LoadingOverlay isLoading={loading} />
			</MainView>
		</ScrollView>
	);
};

const NotificationSettings = () => {
	return (
		<View>
			<Text>NotificationSettings</Text>
		</View>
	);
};

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

	settingsList: {
		marginVertical: 10,
		flexDirection: "column",
	},

	settingsItem: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},

	settingsText: {
		fontSize: 24,
		color: color.primary,
		fontFamily: font.fontFamily,
		fontWeight: "light",
		marginLeft: 10,
	},

	arrowRight: {
		marginLeft: "auto",
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

	updateBtnContainer: {
		marginVertical: 20,
	},

	errorText: {
		fontSize: 22,
		color: color.red,
		fontFamily: font.fontFamily,
		textAlign: "center",
		fontWeight: "bold",
	},

	otherBtnsContainer: {
		marginTop: "auto",
		marginBottom: 40,
	},

	changePasswordBtn: {
		marginBottom: 20,
	},
});
