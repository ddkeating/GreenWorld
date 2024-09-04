import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import color from "../config/color";

// Navigation Back Button Component for React Navigation Stack.
const NavigationBackBtn = ({ navigation, btnColor = color.primary }) => {
	return (
		<TouchableOpacity onPress={() => navigation.goBack()}>
			<Icon name="arrow-left" size={34} color={btnColor} />
		</TouchableOpacity>
	);
};

export default NavigationBackBtn;

const styles = StyleSheet.create({});
