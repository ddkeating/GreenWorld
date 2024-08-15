import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

// Components Import
import MainView from "../../components/MainView";

// Images Import
import transportationImg from "../../assets/images/transportation.png";

// This function is responsible for controlling the nested navigation stack for the EcoTips screen.
export const EcoTipsStack = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator initialRouteName="EcoTipsMain">
			<Stack.Screen
				name="EcoTipsMain"
				component={EcoTips}
				options={{ headerShown: false }} // Hide header for main EcoTips screen
			/>
			<Stack.Screen name="TransportationTips" component={TransportationTips} />
			<Stack.Screen name="EnergyTips" component={EnergyTips} />
			<Stack.Screen name="LifestyleTips" component={LifestyleTips} />
			<Stack.Screen name="DietaryTips" component={DietaryTips} />
		</Stack.Navigator>
	);
};

const EcoTips = ({ navigation }) => {
	return (
		<MainView>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => navigation.navigate("TransportationTips")}
				>
					<Image
						source={transportationImg}
						alt="An image of a car"
						style={styles.transportImg}
					/>
					<Text>Transportation</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("EnergyTips")}>
					<Image
						source={transportationImg}
						alt="An image of a car"
						style={styles.transportImg}
					/>
					<Text>Transportation</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("LifestyleTips")}>
					<Image
						source={transportationImg}
						alt="An image of a car"
						style={styles.transportImg}
					/>
					<Text>Transportation</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("DietaryTips")}>
					<Image
						source={transportationImg}
						alt="An image of a car"
						style={styles.transportImg}
					/>
					<Text>Transportation</Text>
				</TouchableOpacity>
			</View>
		</MainView>
	);
};

const TransportationTips = () => {
	return (
		<MainView>
			<Text>Transportation </Text>
		</MainView>
	);
};

const EnergyTips = () => {
	return (
		<MainView>
			<Text>Energy Tips</Text>
		</MainView>
	);
};

const LifestyleTips = () => {
	return (
		<MainView>
			<Text>Lifestyle Tips</Text>
		</MainView>
	);
};

const DietaryTips = () => {
	return (
		<MainView>
			<Text>Dietary Tips</Text>
		</MainView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 2,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
	},
	transportImg: {
		width: Dimensions.get("window").width / 2.5,
		height: Dimensions.get("window").width / 2.5,
	},
});
