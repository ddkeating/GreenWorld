// Module Import
import {
	createDrawerNavigator,
	DrawerItem,
	useDrawerStatus,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text, View, TouchableOpacity } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

// Screens Import
import HomeScreen from "../screens/application-stack/HomeScreen";
import EcoTips from "../screens/application-stack/EcoTipsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import TrackerScreen from "../screens/application-stack/TrackerScreen";
import ChallengeScreen from "../screens/application-stack/ChallengeScreen";
import SettingsScreen from "../screens/account-settings/SettingsScreen";
import SettingsDetails from "../screens/account-settings/SettingsDetails";
import ProductScreen from "../screens/application-stack/ProductScreen";
import ArticlesScreen from "../screens/application-stack/ArticlesScreen";
import ProfileScreen from "../screens/application-stack/ProfileScreen";

// Config
import color from "../config/color";
import font from "../config/font";
import CustomDrawerContent from "../components/CustomDrawerView";
import PrivacyPolicy from "../screens/policies/PrivacyPolicy";
import TermsOfService from "../screens/policies/TermsOfService";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const AuthStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={HomeScreen} />
		</Stack.Navigator>
	);
};

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
					<Text
						style={{
							fontFamily: font.fontFamily,
							fontSize: 34,
							color: color.white,
							textTransform: "uppercase",
							paddingLeft: 10,
							width: 300,
						}}
					>
						Greenworld
					</Text>
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
				component={TrackerScreen}
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
				component={EcoTips}
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
		</Drawer.Navigator>
	);
};
