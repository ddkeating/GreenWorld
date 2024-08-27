import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import font from "../config/font";

const CustomBtn = ({
	title,
	color,
	textColor,
	onPress,
	fontSize = Dimensions.get("window").width * 0.08,
}) => {
	return (
		<TouchableOpacity
			style={{
				backgroundColor: color,
				padding: 10,
				borderRadius: 10,
				marginHorizontal: "auto",
				alignItems: "center",
				width: Dimensions.get("window").width / 1.5,
				shadowColor: "#000",
				shadowOffset: {
					width: 2,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3,
				elevation: 5,
			}}
			onPress={onPress}
		>
			<Text
				style={{
					color: textColor,
					fontFamily: font.fontFamily,
					fontWeight: Platform.OS === "ios" ? "600" : "bold",
					fontSize: fontSize,
				}}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomBtn;

const styles = StyleSheet.create({});
