import { StyleSheet, Text, Touchable, View } from "react-native";
import React from "react";

import { auth } from "../../utility/firebase-modules/Firebase";
import { signOut } from "firebase/auth";
import CustomBtn from "../../components/CustomBtn";
import color from "../../config/color";

const ProfileScreen = () => {
	return (
		<MainView>
			<Text>ProfileScreen</Text>
			<CustomBtn
				title="Sign Out"
				onPress={() => signOut(auth)}
				color={color.red}
				textColor={color.white}
			/>
		</MainView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({});
