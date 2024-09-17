import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	updateProfile,
	updateEmail,
} from "firebase/auth";

// Components Import
import NavigationBackBtn from "../../components/NavigationBackBtn";
import CustomBtn from "../../components/CustomBtn";
import LoadingOverlay from "../../components/Loading";
import CustomModal from "../../components/CustomModal";
import MainView from "../../components/MainView";

// Config Imports
import color from "../../config/color";
import font from "../../config/font";
import { auth } from "../../utility/firebase-modules/Firebase";
import {
	getUserSettings,
	handleUserSettings,
} from "../../utility/firebase-modules/DataHandling";
import PasswordChangeScreen from "./PasswordChangeScreen";

// Navigation stack to handle settings navigation.
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
			<Stack.Screen name="Change Password" component={PasswordChangeScreen} />
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
					<TouchableOpacity
						style={styles.settingsItem}
						onPress={() => navigation.navigate("Notification Settings")}
					>
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
	// State Variables
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const [error, setError] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	const [loading, setLoading] = useState(false);

	const [modalVisible, setModalVisible] = useState(false);
	const [modalTextEntry, setModalTextEntry] = useState("");

	const [deletingAccount, setDeletingAccount] = useState(false);

	// On Component Mount Effect Hook to fetch user details
	useEffect(() => {
		const loadUserDetails = async () => {
			setLoading(true);
			const currentUser = auth.currentUser;
			if (currentUser) {
				setName(currentUser.displayName || "");
				setEmail(currentUser.email || "");
			}
			setLoading(false);
		};

		loadUserDetails();
	}, []);

	// Function to validate email
	const validateEmail = (email) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	// Function to handle the confirmation of the modal
	const handleConfirm = async () => {
		setLoading(true);
		setError("");
		setSuccessMsg("");

		// If user is logged in.
		const currentUser = auth.currentUser;
		if (currentUser) {
			// Create a credential with the email and password entered by the user
			const credential = EmailAuthProvider.credential(
				currentUser.email,
				modalTextEntry // Password entered by the user
			);

			try {
				// Reauthenticate the user
				await reauthenticateWithCredential(currentUser, credential);

				// If the user is deleting the account
				if (deletingAccount) {
					// Proceed with account deletion.
					// INTENDED TO DELETE USER PROGRESSION DURING THIS FUNCTION HOWEVER IT REQUIRES A BETTER UNDERSTANDING OF FIRESTORE API AND RECURSIVE DELETION OF USER DATA.
					await currentUser.delete();
				} else {
					// Update profile
					await updateProfile(currentUser, {
						displayName: name,
					});

					// If the email has been changed, update the email
					if (email !== currentUser.email) {
						await updateEmail(currentUser, email);
					}

					// Reload the user to get the updated details
					auth.currentUser.reload().then(() => {
						setSuccessMsg("Profile updated successfully");
					});
				}
			} catch (error) {
				setError(
					"Authentication failed. Please check your password and try again."
				);
			}
		}

		setLoading(false);
		setModalVisible(false);
		setDeletingAccount(false); // Reset deletion state
	};

	// Function to handle the change in the modal text
	const handleModalTextChange = (text) => {
		setModalTextEntry(text);
	};

	// Function to handle the deletion of the account
	const handleDeleteAccount = () => {
		setDeletingAccount(true); // Set state to indicate account deletion
		setModalVisible(true); // Show the modal to confirm the password
	};

	// Error handling function for updating profile.
	const handleUpdateProfile = () => {
		// If name or email is empty, show error or email is not valid, show error.
		if (!name.trim()) {
			setError("Please enter a valid name");
			return;
		}
		if (!email.trim() || !validateEmail(email)) {
			setError("Please enter a valid email");
			return;
		}

		// If the email and name are the same as the current user's email and name, show error.
		if (
			auth.currentUser.email === email &&
			auth.currentUser.displayName === name
		) {
			setError("Please enter a new email or name");
			return;
		}

		setModalVisible(true); // Show the modal to confirm the password
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
						color={color.accent}
						textColor={color.black}
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
				<CustomModal
					text="Please enter your password to confirm"
					textPlaceholder="Password"
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					onTextChange={handleModalTextChange}
					onConfirm={handleConfirm}
				/>
			</MainView>
		</ScrollView>
	);
};

const NotificationSettings = ({ navigation }) => {
	const [pushNotifications, setPushNotifications] = useState(true);

	useEffect(() => {
		// Fetch the user's notification settings
		const fetchUserSettings = async () => {
			const userSettings = await getUserSettings();
			if (userSettings) {
				setPushNotifications(userSettings.pushNotifications);
			}
		};
		fetchUserSettings();
	}, []);

	const handleUpdateSettings = async (boolean) => {
		setPushNotifications(boolean);
		const settings = {
			pushNotifications: boolean,
		};
		await handleUserSettings(settings);
	};

	return (
		<ScrollView>
			<MainView>
				<View style={styles.headerContainer}>
					<NavigationBackBtn navigation={navigation} color={color.primary} />
					<Text style={styles.headerText}>Notifications</Text>
				</View>
				<View style={styles.notificationSettingsList}>
					<View style={styles.NotificationSettingsItem}>
						<Text style={styles.notificationSettingsText}>
							Push Notifications
						</Text>
						<Switch
							value={pushNotifications}
							onValueChange={(value) => handleUpdateSettings(value)}
							style={styles.arrowRight}
							trackColor={{ true: color.secondary }}
							ios_backgroundColor={color.black}
						/>
					</View>
				</View>
			</MainView>
		</ScrollView>
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

	notificationSettingsList: {
		marginVertical: 10,
		flexDirection: "column",
	},

	NotificationSettingsItem: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},

	notificationSettingsText: {
		fontSize: 24,
		color: color.primary,
		fontFamily: font.fontFamily,
		fontWeight: "bold",
		marginLeft: 10,
	},
});
