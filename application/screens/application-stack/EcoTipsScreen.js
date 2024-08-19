import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import color from "../../config/color";
import font from "../../config/font";

// Components Import
import MainView from "../../components/MainView";

// Images Import
import transportationImg from "../../assets/images/transportation.png";
import dietImg from "../../assets/images/diet.png";
import solarImg from "../../assets/images/solar.png";
import lifeStyleImg from "../../assets/images/lifestyle.png";
import NavigationBackBtn from "../../components/NavigationBackBtn";

// This function is responsible for controlling the nested navigation stack for the EcoTips screen.
export const EcoTipsStack = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator initialRouteName="EcoTipsMain" screenOptions={{headerShown:false}}>
			<Stack.Screen
				name="EcoTipsMain"
				component={EcoTips}
				
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
						source={solarImg}
						alt="An image of a car"
						style={styles.transportImg}
					/>
					<Text>Energy Usage</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("LifestyleTips")}>
					<Image
						source={lifeStyleImg}
						alt="An image of a car"
						style={styles.transportImg}
					/>
					<Text>Life Style Tips</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("DietaryTips")}>
					<Image
						source={dietImg}
						alt="An image of a car"
						style={styles.transportImg}
					/>
					<Text>Dietary</Text>
				</TouchableOpacity>
			</View>
		</MainView>
	);
};

const TransportationTips = ({navigation}) => {
	return (
		<MainView>
		<ScrollView>
		<View style={styles.headerContainer}>
		<NavigationBackBtn navigation={navigation} color={color.primary}/>
		<Text style={styles.headerText}>Transportation Tips</Text>
		</View>
		<View style={styles.section}>
					<Text style={styles.sectionHeader}>Opt for Public Transportation</Text>
					<Text style={styles.paragraph}>
					
					Use buses, trains, and trams to reduce your carbon footprint. Public transport emits far less CO2 per person than driving a car.
					</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.sectionHeader}>Carpool or Ride-Share</Text>
					<Text style={styles.paragraph}>
					
					Share rides with friends, colleagues, or use ride-sharing services. Carpooling reduces the number of vehicles on the road, cutting down on emissions.
					</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.sectionHeader}>Cycle Instead of Driving</Text>
					<Text style={styles.paragraph}>
					
					Whenever possible, use a bicycle for short trips. Cycling is a zero-emission way to get around and also promotes a healthy lifestyle.
					</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.sectionHeader}>Support Green Transportation Initiatives</Text>
					<Text style={styles.paragraph}>
					
					Advocate for and support local initiatives aimed at improving and expanding eco-friendly transportation options in your community, such as bike lanes and electric bus networks.
					</Text>
				</View>
				
		</ScrollView>
			
		</MainView>
	);
};

const EnergyTips = ({navigation}) => {
	return (
		<MainView>
		<ScrollView>
		<View style={styles.headerContainer}>
		<NavigationBackBtn navigation={navigation} color={color.primary}/>
		<Text style={styles.headerText}>Energy Tips</Text>
		</View>
		</ScrollView>
		</MainView>
	);
};

const LifestyleTips = ({navigation}) => {
	return (
		<MainView>
		<ScrollView>
		<View style={styles.headerContainer}>
		<NavigationBackBtn navigation={navigation} color={color.primary}/>
		<Text style={styles.headerText}>Life Style Tips</Text>
		</View>
		</ScrollView>
		</MainView>
	);
};

const DietaryTips = ({navigation}) => {
	return (
		<MainView>
		<ScrollView>
		<View style={styles.headerContainer}>
		<NavigationBackBtn navigation={navigation} color={color.primary}/>
		<Text style={styles.headerText}>Dietary Tips</Text>
		</View>
		</ScrollView>
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
	headerContainer:{
		display: "flex",
		flexDirection: "row",

	},
	headerText: {
		color: color.primary,
		flexGrow: 1
	},
	sectionHeader: {
		fontSize: 20,
		fontWeight: "bold",
		color: color.primary,
		marginBottom: 10,
		fontFamily: font.fontFamily,
	},
	paragraph: {
		fontSize: 16,
		lineHeight: 24,
		color: color.black,
		fontFamily: font.fontFamily,
	},
});

