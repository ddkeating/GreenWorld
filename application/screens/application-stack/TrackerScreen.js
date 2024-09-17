// Module Imports
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Component Imports
import MainView from "../../components/MainView";
import CustomBtn from "../../components/CustomBtn";
import NavigationBackBtn from "../../components/NavigationBackBtn";

// Config Imports
import color from "../../config/color";
import font from "../../config/font";
import {
	calculateCarbonElectricity,
	calculateCarbonFlight,
	calculateCarbonTransportation,
	fetchCarbonFootprintData,
	getUserSettings,
	setCarbonFootprintData,
} from "../../utility/firebase-modules/DataHandling";

// Images
import solarPanelImg from "../../assets/images/solar.png";
import transporationImg from "../../assets/images/transportation.png";
import planeImg from "../../assets/images/plane.png";
import LoadingOverlay from "../../components/Loading";

export const TrackerStack = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator
			initialRouteName="Tracker-Home"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Tracker-Home" component={TrackerScreen} />
			<Stack.Screen name="Energy-Usage" component={EnergyUsageScreen} />
			<Stack.Screen name="Transportation" component={Transportation} />
			<Stack.Screen name="Flying" component={FlyingScreen} />
		</Stack.Navigator>
	);
};

const TrackerScreen = ({ navigation }) => {
	const [currentSummary, setCurrentSummary] = useState(0.0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCarbonData = async () => {
			setLoading(true);
			const todaysData = await fetchCarbonFootprintData();
			setCurrentSummary(todaysData[0]?.carbonFootprint);
			setLoading(false);
		};
		fetchCarbonData();
	}, []);

	const carbonTrackerItems = [
		{
			title: "Energy Usage",
			img: solarPanelImg,
			route: "Energy-Usage",
		},
		{
			title: "Transportation",
			img: transporationImg,
			route: "Transportation",
		},
		{
			title: "Flying",
			img: planeImg,
			route: "Flying",
		},
	];
	return (
		<ScrollView>
			<MainView>
				<View style={styles.headerContainer}>
					<NavigationBackBtn color={color.primary} navigation={navigation} />
					<Text style={styles.headerText}>Tracker</Text>
				</View>
				<View style={styles.gridLayout}>
					{carbonTrackerItems.map((item, index) => (
						<View style={styles.cardContainer} key={index}>
							<TouchableOpacity
								key={index}
								onPress={() => navigation.navigate(item.route)}
							>
								<Image
									source={item.img}
									alt={item.title}
									style={styles.cardImg}
								/>
							</TouchableOpacity>
							<Text style={styles.cardText}>{item.title}</Text>
						</View>
					))}
				</View>
				<View style={styles.textContainer}>
					<Text
						style={[
							styles.summaryText,
							{ color: color.black, fontSize: 26, fontWeight: "bold" },
						]}
					>
						Today's Summary
					</Text>
					<Text
						style={[
							styles.summaryText,
							{ color: currentSummary > 1 ? color.red : color.secondary },
						]}
					>
						{currentSummary ? currentSummary : 0.0} Metric Tons
					</Text>
				</View>
			</MainView>
		</ScrollView>
	);
};

const EnergyUsageScreen = ({ navigation }) => {
	const [unitMeasurement, setUnitMeasurement] = useState("KWh");
	const [dailyPowerUsage, setDailyPowerUsage] = useState(null);
	const [calculatedAmount, setCalculatedAmount] = useState(0);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const calculateEnergyUsage = async () => {
		try {
			const carbonData = await calculateCarbonElectricity({
				dailyPowerUsage: dailyPowerUsage,
				unitMeasurement: unitMeasurement,
			});
			console.log(carbonData);
			return carbonData;
		} catch (error) {
			console.error("Error while calculating energy usage: ", error);
		}
	};

	const handleFormSubmit = async () => {
		setError("");
		setLoading(true);
		if (!dailyPowerUsage || dailyPowerUsage <= 0) {
			setError("Please enter a valid daily power usage amount.");
			setLoading(false);
			return;
		}
		const carbonData = await calculateEnergyUsage();
		setCalculatedAmount(carbonData);
		await setCarbonFootprintData(carbonData);
		setLoading(false);
	};

	return (
		<ScrollView>
			<MainView>
				<View style={styles.headerContainer}>
					<NavigationBackBtn color={color.primary} navigation={navigation} />
					<Text style={styles.headerText}>Energy Usage</Text>
				</View>
				<View>
					<Text style={styles.inputLabel}>Daily Usage Amount</Text>
					<View style={styles.inputContainer}>
						<TextInput
							keyboardType="numeric"
							placeholder="Enter Daily Power Usage"
							style={styles.input}
							placeholderTextColor={"gray"}
							onChangeText={(text) => setDailyPowerUsage(text)}
						/>
					</View>
					<Text style={styles.inputLabel}>Measurement Unit</Text>
					<View style={styles.unitContainer}>
						<TouchableOpacity onPress={() => setUnitMeasurement("KWh")}>
							<Text
								style={[
									styles.unitText,
									{
										backgroundColor:
											unitMeasurement == "KWh" ? color.secondary : color.black,
									},
								]}
							>
								KWh
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setUnitMeasurement("MWh")}>
							<Text
								style={[
									styles.unitText,
									{
										backgroundColor:
											unitMeasurement == "MWh" ? color.secondary : color.black,
									},
								]}
							>
								MWh
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.calculatedAmountContainer}>
					<Text style={styles.calculatedAmountText}>
						Calculated: {calculatedAmount !== null ? calculatedAmount : 0}{" "}
						Metric Tons
					</Text>
				</View>
				<Text style={[styles.errorText, { height: error !== "" ? "auto" : 0 }]}>
					{error}
				</Text>
				<View style={styles.btnContainer}>
					<CustomBtn
						title="Submit"
						textColor={color.white}
						color={color.secondary}
						onPress={handleFormSubmit}
					/>
				</View>
				<LoadingOverlay isLoading={loading} />
			</MainView>
		</ScrollView>
	);
};

const Transportation = ({ navigation }) => {
	const [unitMeasurement, setUnitMeasurement] = useState("km");
	const [distanceTraveled, setDistanceTraveled] = useState(null);
	const [calculatedAmount, setCalculatedAmount] = useState(0);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const calculateTransportationUsage = async () => {
		try {
			const carbonData = await calculateCarbonTransportation({
				distance: distanceTraveled,
				mode: unitMeasurement,
			});

			return carbonData;
		} catch (error) {
			console.error("Error while calculating energy usage: ", error);
		}
	};

	const handleFormSubmit = async () => {
		setError("");
		setLoading(true);
		if (!distanceTraveled || distanceTraveled <= 0) {
			setError("Please enter a valid distance traveled amount.");
			setLoading(false);
			return;
		}
		const carbonData = await calculateTransportationUsage();
		setCalculatedAmount(carbonData);
		await setCarbonFootprintData(carbonData);
		setLoading(false);
	};
	return (
		<ScrollView>
			<MainView>
				<View style={styles.headerContainer}>
					<NavigationBackBtn color={color.primary} navigation={navigation} />
					<Text style={styles.headerText}>Transportation</Text>
				</View>
				<View>
					<Text style={styles.inputLabel}>Distance Traveled</Text>
					<View style={styles.inputContainer}>
						<TextInput
							keyboardType="numeric"
							placeholder="Enter Distance Traveled"
							style={styles.input}
							placeholderTextColor={"gray"}
							onChangeText={(text) => setDistanceTraveled(text)}
						/>
					</View>
					<Text style={styles.inputLabel}>Measurement Unit</Text>
					<View style={styles.unitContainer}>
						<TouchableOpacity onPress={() => setUnitMeasurement("km")}>
							<Text
								style={[
									styles.unitText,
									{
										backgroundColor:
											unitMeasurement == "km" ? color.secondary : color.black,
									},
								]}
							>
								Km
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setUnitMeasurement("mi")}>
							<Text
								style={[
									styles.unitText,
									{
										backgroundColor:
											unitMeasurement == "mi" ? color.secondary : color.black,
									},
								]}
							>
								Miles
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.calculatedAmountContainer}>
					<Text style={styles.calculatedAmountText}>
						Calculated: {calculatedAmount !== null ? calculatedAmount : 0}{" "}
						Metric Tons
					</Text>
				</View>
				<Text style={[styles.errorText, { height: error !== "" ? "auto" : 0 }]}>
					{error}
				</Text>
				<View style={styles.btnContainer}>
					<CustomBtn
						title="Submit"
						textColor={color.white}
						color={color.secondary}
						onPress={handleFormSubmit}
					/>
				</View>
				<LoadingOverlay isLoading={loading} />
			</MainView>
		</ScrollView>
	);
};

const FlyingScreen = ({ navigation }) => {
	const [calculatedAmount, setCalculatedAmount] = useState(0);
	const [passengers, setPassengers] = useState(null);
	const [flightData, setFlightData] = useState({
		departure_airport: "",
		destination_airport: "",
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const calculateFlyingUsage = async () => {
		try {
			const carbonData = await calculateCarbonFlight({
				flightData: flightData,
				passengers: passengers,
			});
			return carbonData;
		} catch (error) {
			console.error("Error while calculating energy usage: ", error);
		}
	};

	const handleFormSubmit = async () => {
		setError("");
		setLoading(true);
		if (!passengers || passengers <= 0) {
			setError("Please enter a valid passenger amount.");
			setLoading(false);
			return;
		}
		if (!flightData.departure_airport || !flightData.destination_airport) {
			setError("Please enter a valid airport code.");
			setLoading(false);
			return;
		}
		const carbonData = await calculateFlyingUsage();
		setCalculatedAmount(carbonData);
		await setCarbonFootprintData(carbonData);
		setLoading(false);
	};

	return (
		<ScrollView>
			<MainView>
				<View style={styles.headerContainer}>
					<NavigationBackBtn color={color.primary} navigation={navigation} />
					<Text style={styles.headerText}>Flying</Text>
				</View>
				<View>
					<Text style={styles.inputLabel}>Passengers</Text>
					<View style={styles.inputContainer}>
						<TextInput
							keyboardType="numeric"
							placeholder="Enter Passenger Amount"
							style={styles.input}
							placeholderTextColor={"gray"}
							onChangeText={(text) => setPassengers(text)}
						/>
					</View>
					<Text style={styles.inputLabel}>Departure Airport Code</Text>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder="Enter Departure Airport Code"
							style={styles.input}
							placeholderTextColor={"gray"}
							inputMode="text"
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={(text) =>
								setFlightData({ ...flightData, departure_airport: text })
							}
						/>
					</View>
					<Text style={styles.inputLabel}>Arrival Airport Code</Text>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder="Enter Arrival Airport Code"
							style={styles.input}
							placeholderTextColor={"gray"}
							inputMode="text"
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={(text) =>
								setFlightData({ ...flightData, destination_airport: text })
							}
						/>
					</View>
				</View>

				<View style={styles.calculatedAmountContainer}>
					<Text style={styles.calculatedAmountText}>
						Calculated: {calculatedAmount !== null ? calculatedAmount : 0}{" "}
						Metric Tons
					</Text>
				</View>
				<Text style={[styles.errorText, { height: error !== "" ? "auto" : 0 }]}>
					{error}
				</Text>
				<View style={styles.btnContainer}>
					<CustomBtn
						title="Submit"
						textColor={color.white}
						color={color.secondary}
						onPress={handleFormSubmit}
					/>
				</View>
				<LoadingOverlay isLoading={loading} />
			</MainView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 20,
	},
	headerText: {
		fontFamily: font.fontFamily,
		fontSize: 32,
		fontWeight: "light",
		color: color.primary,
		textAlign: "left",
		marginLeft: 10,
	},
	gridLayout: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
	},
	cardContainer: {
		alignItems: "center",
		margin: 10,
	},
	cardImg: {
		width: Dimensions.get("window").width / 2.5,
		height: Dimensions.get("window").width / 2.5,
		borderRadius: 10,
	},
	cardText: {
		fontFamily: font.fontFamily,
		fontSize: 20,
		fontWeight: "bold",
		color: color.black,
		marginTop: 10,
	},
	textContainer: {
		marginTop: "auto",
		marginBottom: 80,
	},
	summaryText: {
		fontFamily: font.fontFamily,
		fontSize: 24,
		marginTop: 10,
		textAlign: "center",
	},

	inputLabel: {
		fontFamily: font.fontFamily,
		fontSize: 20,
		fontWeight: "bold",
		color: color.primary,
		marginHorizontal: 20,
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
		fontSize: 20,
		fontFamily: font.fontFamily,
		color: color.primary,
		flexGrow: 1,
		fontWeight: "bold",
	},
	errorText: {
		fontSize: 18,
		color: color.red,
		fontFamily: font.fontFamily,
		textAlign: "left",
		fontWeight: "bold",
		marginHorizontal: 20,
		marginTop: 10,
	},
	unitContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		marginHorizontal: 20,
		marginVertical: 10,
	},
	unitText: {
		fontFamily: font.fontFamily,
		fontSize: 20,
		fontWeight: "bold",
		color: color.white,
		padding: 5,
	},
	btnContainer: {
		marginTop: "auto",
		marginBottom: 100,
	},
	calculatedAmountContainer: {
		marginTop: "20",
		marginHorizontal: 20,
	},
	calculatedAmountText: {
		fontFamily: font.fontFamily,
		fontSize: 18,
		fontWeight: "bold",
		color: color.primary,
	},
});
