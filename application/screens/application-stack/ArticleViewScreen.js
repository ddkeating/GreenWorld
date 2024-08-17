import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ArticleViewScreen = ({ route }) => {
	const { articleData } = route.params;
	return (
		<View>
			<Text>{articleData.title}</Text>
		</View>
	);
};

export default ArticleViewScreen;

const styles = StyleSheet.create({});
