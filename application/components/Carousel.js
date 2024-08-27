import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import Carousel from "react-native-reanimated-carousel";

// Config Imports
import color from "../config/color";
import font from "../config/font";

const CarouselComponent = ({ content, navigation }) => {
	// State Variables
	const [currentIndex, setCurrentIndex] = useState(0);

	// Carousel Ref variable for handling the carousel component.
	const carouselRef = useRef(null);

	const handlePagination = (index) => {
		if (carouselRef.current) {
			carouselRef.current.scrollTo({
				index,
				animated: true,
			});
		}
	};

	return (
		<>
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
					data={content}
					scrollAnimationDuration={500}
					renderItem={({ index }) => (
						<TouchableOpacity
							onPress={() => navigation.navigate(content[index].route)}
						>
							<View style={styles.carouselItemContainer}>
								<Text style={styles.carouselItemText}>
									{content[index].title}
								</Text>
							</View>
						</TouchableOpacity>
					)}
				/>
			</View>
			<View style={styles.paginationContainer}>
				{content.map((_, index) => (
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
		</>
	);
};

export default CarouselComponent;

const styles = StyleSheet.create({
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
});
