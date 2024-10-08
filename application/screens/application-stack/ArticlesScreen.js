import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	TouchableOpacity,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utility/firebase-modules/Firebase";
import MainView from "../../components/MainView"; // Adjust the path accordingly
import ArticleViewScreen from "./ArticleViewScreen";
import landingImg from "../../assets/images/landing.png";

import { createStackNavigator } from "@react-navigation/stack";
import { fetchArticleData } from "../../utility/firebase-modules/DataHandling";
import LoadingOverlay from "../../components/Loading";
import NavigationBackBtn from "../../components/NavigationBackBtn";
import color from "../../config/color";
import font from "../../config/font";

export const ArticleStack = ({}) => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator
			initialRouteName="Articles"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Articles List" component={ArticlesScreen} />
			<Stack.Screen name="Article View" component={ArticleViewScreen} />
		</Stack.Navigator>
	);
};

const ArticlesScreen = ({ navigation }) => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchArticles = async () => {
			setLoading(true);
			const data = await fetchArticleData();
			setArticles(data.articles.slice(0, 10)); // Implement slicing for pagination.
			setLoading(false);
		};

		fetchArticles();
	}, []);

	const handleArticlePress = (article) => {
		navigation.navigate("Article View", { articleData: article });
	};

	return (
		<MainView>
			<View style={styles.headerContainer}>
				<NavigationBackBtn navigation={navigation} color={color.primary} />
				<Text style={styles.headerText}>Articles</Text>
			</View>
			<FlatList
				data={articles}
				keyExtractor={(_i, index) => index}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => handleArticlePress(item)}>
						<View style={styles.articleItem}>
							<Image
								source={item.urlToImage ? { uri: item.urlToImage } : landingImg}
								style={styles.articleImage}
							/>
							<Text style={styles.articleTitle}>{item.title}</Text>
							<Text style={styles.articleSummary}>{item.summary}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
			<LoadingOverlay isLoading={loading} />
		</MainView>
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
	articleItem: {
		marginBottom: 20,
		padding: 10,
		backgroundColor: "#fff", // Ensures readability on the overlay
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	articleImage: {
		width: "100%",
		height: 200,
		borderRadius: 8,
	},
	articleTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginVertical: 5,
	},
	articleSummary: {
		fontSize: 14,
		color: "#555",
	},
});

export default ArticlesScreen;
