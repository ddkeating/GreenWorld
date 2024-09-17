// Module Import
import {
	createDrawerNavigator,
	useDrawerStatus,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

// Screens Import
import HomeScreen from "../screens/application-stack/HomeScreen";
import { EcoTipsStack } from "../screens/application-stack/EcoTipsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { TrackerStack } from "../screens/application-stack/TrackerScreen";
import {
	ChallengeScreen,
	ChallengeOverviewScreen,
} from "../screens/application-stack/ChallengeScreen";
import SettingsStack from "../screens/account-settings/SettingsScreen";
import ProductScreen from "../screens/application-stack/ProductScreen";
import ArticlesScreen, {
	ArticlesNavigator,
} from "../screens/application-stack/ArticlesScreen";
import ProfileScreen from "../screens/application-stack/ProfileScreen";
import PrivacyPolicy from "../screens/policies/PrivacyPolicy";
import TermsOfService from "../screens/policies/TermsOfService";
import LandingScreen from "../screens/authentication/LandingScreen";
import PasswordReset from "../screens/authentication/PasswordReset";
import LoginScreen from "../screens/authentication/LoginScreen";
import RegisterScreen from "../screens/authentication/RegisterScreen";
import ArticleViewScreen from "../screens/application-stack/ArticleViewScreen";

// Config
import color from "../config/color";
import font from "../config/font";
import CustomDrawerContent from "../components/CustomDrawerView";
import NavigationBackBtn from "../components/NavigationBackBtn";
import { useAuthHook } from "./firebase-modules/UseAuthHook";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Authentication Stack Navigator for the authentication screens.
export const AuthStack = () => {
	const navigation = useNavigation();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				header: () => (
					<View
						style={{
							backgroundColor: color.primary,
							height: Dimensions.get("screen").height * 0.11,
							width: "100%",
							position: "relative",
							alignItems: "flex-start",
							paddingLeft: 10,
							paddingBottom: 10,
							justifyContent: "flex-end",
						}}
					>
						<StatusBar barStyle="light-content" />
						<NavigationBackBtn navigation={navigation} />
					</View>
				),
			}}
		>
			<Stack.Screen name="Landing" component={LandingScreen} />
			<Stack.Screen
				name="Privacy Policy"
				component={PrivacyPolicy}
				options={{
					headerShown: true,
				}}
			/>
			<Stack.Screen
				name="Terms Of Service"
				component={TermsOfService}
				options={{
					headerShown: true,
				}}
			/>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					headerShown: true,
				}}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterScreen}
				options={{
					headerShown: true,
				}}
			/>
			<Stack.Screen
				name="Password Reset"
				component={PasswordReset}
				options={{ headerShown: true }}
			/>
		</Stack.Navigator>
	);
};

// Main Application Stack Navigator for the main application screens
export const AppStack = () => {
	const navigation = useNavigation();
	const headerHeight = 100;
	const drawerHeight = Dimensions.get("screen").height - headerHeight;
	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				drawerPosition: "right",
				drawerStyle: {
					backgroundColor: color.primary,
					height: drawerHeight,
					width: "80%",
					top: headerHeight,
				},
				overlayColor: 0,
				drawerActiveTintColor: color.white,
				drawerType: "front",
				drawerLabelStyle: {
					color: color.white,
					padding: 5,
					paddingVertical: 10,
					fontSize: 20,
					fontWeight: "200",
					textAlign: "center",
					margin: 0,
				},
				drawerItemStyle: {
					borderBottomColor: color.white,
					borderBottomWidth: 1,
				},
				drawerContentContainerStyle: {
					paddingTop: 0,
				},
				drawerContentStyle: {
					margin: 0,
				},

				headerLeft: () => (
					<View>
						<Text
							style={{
								fontFamily: font.fontFamily,
								fontSize: 34,
								color: color.white,
								textTransform: "uppercase",
								paddingLeft: 10,
								width:
									Dimensions.get("screen").width -
									Dimensions.get("screen").width * 0.2,
							}}
						>
							Greenworld
						</Text>
						<StatusBar barStyle="light-content" />
					</View>
				),
				headerRight: () => (
					<TouchableOpacity
						onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
					>
						<Icon
							name={useDrawerStatus() === "open" ? "close" : "menu"}
							size={40}
							color={color.white}
							style={{ paddingRight: 10 }}
						/>
					</TouchableOpacity>
				),
				headerStyle: {
					backgroundColor: color.primary,
					height: headerHeight,
				},
				headerTitle: () => null,
			}}
		>
			<Drawer.Screen
				name="Home"
				component={HomeScreen}
				options={{
					drawerIcon: () => <Icon name="home" size={40} color={color.white} />,
				}}
			/>
			<Drawer.Screen
				name="Tracker"
				component={TrackerStack}
				options={{
					drawerIcon: () => (
						<Icon name="chart-line" size={40} color={color.white} />
					),
				}}
			/>
			<Drawer.Screen
				name="Articles"
				component={ArticlesScreen}
				options={{
					drawerIcon: () => (
						<Icon name="newspaper" size={40} color={color.white} />
					),
				}}
			/>
			<Drawer.Screen
				name="Product Finder"
				component={ProductScreen}
				options={{
					drawerIcon: () => (
						<Icon name="magnify" size={40} color={color.white} />
					),
				}}
			/>
			<Drawer.Screen
				name="Daily Challenges"
				component={ChallengeScreen}
				options={{
					drawerIcon: () => (
						<Icon name="trophy" size={40} color={color.white} />
					),
				}}
			/>
			<Drawer.Screen
				name="Eco Tips"
				component={EcoTipsStack}
				options={{
					drawerIcon: () => <Icon name="leaf" size={40} color={color.white} />,
				}}
			/>
			<Drawer.Screen
				name="Your Profile"
				component={ProfileScreen}
				options={{
					drawerIcon: () => (
						<Icon name="account" size={40} color={color.white} />
					),
				}}
			/>
			{/* Giving these items a height of 0 to prevent them as displaying as labels in the drawer */}
			<Drawer.Screen
				name="Privacy Policy"
				component={PrivacyPolicy}
				options={{
					drawerItemStyle: {
						height: 0,
					},
				}}
			/>
			<Drawer.Screen
				name="Terms Of Service"
				component={TermsOfService}
				options={{
					drawerItemStyle: {
						height: 0,
					},
				}}
			/>
			<Drawer.Screen
				name="Article View"
				component={ArticleViewScreen}
				options={{
					drawerItemStyle: {
						height: 0,
					},
				}}
			/>
			<Drawer.Screen
				name="Challenge Overview"
				component={ChallengeOverviewScreen}
				options={{
					drawerItemStyle: {
						height: 0,
					},
				}}
			/>

			<Drawer.Screen
				name="Account Settings"
				component={SettingsStack}
				options={{
					drawerItemStyle: {
						height: 0,
					},
				}}
			/>
		</Drawer.Navigator>
	);
};

// Navigation Handler Function to determine which stack to display.
export const AppNavigator = () => {
	const { user } = useAuthHook();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{user ? (
				<Stack.Screen name="App" component={AppStack} />
			) : (
				<Stack.Screen name="Auth" component={AuthStack} />
			)}
		</Stack.Navigator>
	);
};
