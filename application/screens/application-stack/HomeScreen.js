// Module Imports
import {
	Dimensions,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CarouselComponent from "../../components/Carousel";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

// Components Imports
import MainView from "../../components/MainView";

// Config Imports
import { auth } from "../../utility/firebase-modules/Firebase";
import font from "../../config/font";
import color from "../../config/color";
import { fetchArticleData } from "../../utility/firebase-modules/DataHandling";
import landingImg from "../../assets/images/landing.png";

const HomeScreen = ({ navigation }) => {
	const [articleData, setArticleData] = useState([]);

	useEffect(() => {
		const handleArticleData = async () => {
			const data = await fetchArticleData();
			setArticleData(data.articles);
		};
		handleArticleData();
	}, []);

	// Function for handling the pagination of the carousel component.

	// Carousel Items and their respective routes.
	const carouselItems = [
		{
			title: "Carbon Footprint Tracker",
			route: "Tracker",
		},
		{
			title: "Eco Tips",
			route: "Eco Tips",
		},
		{
			title: "Daily Challenges",
			route: "Daily Challenges",
		},
		{
			title: "Products",
			route: "Product Finder",
		},
		{
			title: "Profile",
			route: "Your Profile",
		},
	];
	return (
		<ScrollView>
			<MainView>
				<Text style={styles.headerText}>
					{auth.currentUser.displayName !== null
						? "Welcome Back " + auth.currentUser.displayName
						: "Welcome to Greenworld"}
				</Text>
				<CarouselComponent content={carouselItems} navigation={navigation} />
				<View style={styles.articleSection}>
					<TouchableOpacity
						style={styles.latestArticlesBtn}
						onPress={() => navigation.navigate("Articles")}
					>
						<Text style={styles.latestArticleText}>Latest Articles</Text>
						<Icon name="arrow-right-thin" size={44} color={color.primary} />
					</TouchableOpacity>
					{articleData.length > 0 && articleData[0] ? (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("Article View", {
									articleData: articleData[0],
								})
							}
						>
							<ImageBackground
								source={
									articleData[0].urlToImage
										? { uri: articleData[0].urlToImage }
										: landingImg
								}
								style={styles.articleContainer}
								imageStyle={styles.articleImg}
								alt="Articles image"
							>
								<View style={styles.articleTextContainer}>
									<Text
										ellipsizeMode="tail"
										numberOfLines={2}
										style={styles.articleTitle}
									>
										{articleData[0].title}
									</Text>
									<Text style={styles.articleDate}>
										{`Date: ${String(
											new Date(articleData[0].publishedAt).getDate()
										).padStart(2, "0")}/${String(
											new Date(articleData[0].publishedAt).getMonth() + 1
										).padStart(2, "0")}/${String(
											new Date(articleData[0].publishedAt).getFullYear()
										).slice(-2)}`}
									</Text>
								</View>
							</ImageBackground>
						</TouchableOpacity>
					) : (
						<Text>Loading...</Text>
					)}
				</View>
			</MainView>
		</ScrollView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	headerText: {
		fontFamily: font.fontFamily,
		color: color.primary,
		fontSize: 30,
		marginVertical: 10,
		fontWeight: "bold",
		textAlign: "center",
		flexWrap: "wrap",
	},

	articleSection: {
		width: "100%",
		alignItems: "flex-start",
		marginTop: 40,
		marginBottom: 10,
	},

	latestArticlesBtn: {
		flexDirection: "row",
		justifyContent: "flex-start",
		gap: 10,
		alignItems: "center",
	},

	latestArticleText: {
		fontFamily: font.fontFamily,
		color: color.primary,
		fontSize: 24,
		fontWeight: "light",
		textAlign: "center",
		flexWrap: "wrap",
	},

	articleContainer: {
		width: "100%",
		height: Dimensions.get("window").height * 0.25,
		borderRadius: 3,
	},

	articleImg: {
		borderRadius: 3,
	},

	articleTextContainer: {
		position: "absolute",
		bottom: 0,
		backgroundColor: color.secondaryAlt,
		width: "100%",
		padding: 5,
	},

	articleTitle: {
		fontFamily: font.fontFamily,
		fontWeight: "bold",
		fontSize: 14,
		textTransform: "none",
		color: color.white,
	},

	articleDate: {
		fontFamily: font.fontFamily,
		fontWeight: "light",
		fontSize: 14,
		textTransform: "none",
		color: color.white,
		textAlign: "left",
		marginTop: 5,
		marginBottom: 5,
	},
});
