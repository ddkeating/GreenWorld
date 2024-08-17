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
import Carousel from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Components Imports
import MainView from "../../components/MainView";

// Config Imports
import { auth } from "../../utility/firebase-modules/Firebase";
import font from "../../config/font";
import color from "../../config/color";
import { fetchArticleData } from "../../utility/firebase-modules/DataHandling";

const HomeScreen = ({ navigation }) => {
	// State Variables
	const [currentIndex, setCurrentIndex] = useState(0);
	// Carousel Ref variable for handling the carousel component.
	const carouselRef = useRef(null);

	const [articleData, setArticleData] = useState([]);

	useEffect(() => {
		const handleArticleData = async () => {
			const data = await fetchArticleData();
			setArticleData(data.articles);
		};
		handleArticleData();
	}, []);

	// Function for handling the pagination of the carousel component.
	const handlePagination = (index) => {
		if (carouselRef.current) {
			carouselRef.current.scrollTo({
				index,
				animated: true,
			});
		}
	};

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
		<MainView>
			<Text style={styles.headerText}>
				{auth.currentUser.displayName !== null
					? "Welcome Back " + auth.currentUser.displayName
					: "Welcome to Greenworld"}
			</Text>

			<View style={styles.carouselContainer}>
				<Carousel
					loop={false}
					/* OnProgress change to update the index in realtime and therefore updating the pagination index. */
					onProgressChange={(_, progress) => {
						setCurrentIndex(Math.round(progress));
					}}
					ref={carouselRef}
					width={Dimensions.get("window").width}
					height={Dimensions.get("window").width}
					autoPlay={false}
					data={carouselItems}
					scrollAnimationDuration={500}
					renderItem={({ index }) => (
						<View style={styles.carouselItemContainer}>
							<Text style={styles.carouselItemText}>
								{carouselItems[index].title}
							</Text>
						</View>
					)}
				/>
			</View>
			<View style={styles.paginationContainer}>
				{carouselItems.map((_, index) => (
					<TouchableOpacity key={index} onPress={() => handlePagination(index)}>
						<View
							style={[
								styles.paginationButtons,
								{
									backgroundColor:
										index === currentIndex ? color.secondary : color.primary,
								},
							]}
						></View>
					</TouchableOpacity>
				))}
			</View>
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
							src={articleData[0].urlToImage}
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

	carouselContainer: {
		width: "100%",
		alignItems: "center",
		marginTop: 20,
		marginBottom: 10,
		height: Dimensions.get("window").width * 0.75,
	},

	carouselItemContainer: {
		borderWidth: 10,
		borderColor: color.secondary,
		backgroundColor: "#ffffffa2",
		borderRadius: 9999,
		alignSelf: "center",
		alignItems: "center",
		width: Dimensions.get("window").width * 0.7,
		height: Dimensions.get("window").width * 0.7,
		shadowOffset: { width: 0, height: 2 },
		shadowColor: color.black,
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	carouselItemText: {
		fontSize: 36,
		fontFamily: font.fontFamily,
		fontWeight: "light",
		textAlign: "center",
		color: color.secondary,
		maxWidth: "80%",
		marginVertical: "auto",
	},

	paginationContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
	},

	paginationButtons: {
		width: 15,
		height: 15,
		borderRadius: 9999,
		backgroundColor: color.secondary,
		marginHorizontal: 8,
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
		height: "35%",
		padding: 5,
	},

	articleTitle: {
		fontFamily: font.fontFamily,
		fontWeight: "bold",
		fontSize: 16,
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
		marginTop: "auto",
	},
});
