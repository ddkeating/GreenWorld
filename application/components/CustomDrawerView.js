import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
	DrawerContentScrollView,
	DrawerContent,
	DrawerItemList,
} from "@react-navigation/drawer";
import color from "../config/color";
import font from "../config/font";
import { useNavigation } from "@react-navigation/native";

const CustomDrawerContent = (props) => {
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1 }}>
			<DrawerContent {...props}>
				<DrawerItemList {...props} />
			</DrawerContent>
			<View style={styles.footer}>
				<View style={styles.links}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Privacy Policy")}
					>
						<Text style={styles.footerText}>Privacy Policy</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate("Terms Of Service")}
					>
						<Text style={styles.footerText}>Terms of Service</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.footerText}>
					All rights reserved ©2024 Greenworld
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	footer: {
		marginBottom: 40,
	},
	links: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	footerText: {
		color: color.white,
		fontSize: 16,
		fontWeight: "200",
		textAlign: "center",
		marginVertical: 10,
	},
});

export default CustomDrawerContent;
