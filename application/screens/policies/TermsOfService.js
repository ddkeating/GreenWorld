import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

// Config imports
import font from "../../config/font";
import color from "../../config/color";

const TermsOfService = () => {
	return (
		<MainView>
			<View style={styles.container}>
				<Text style={styles.headerText}>Terms Of Service</Text>
				<Text style={styles.termsContent}>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
					minus sunt tenetur. Facilis quos omnis ratione autem ducimus quis
					magni nemo possimus perferendis sed nobis laborum placeat, recusandae
					eligendi, alias beatae odio nihil id provident delectus deserunt,
					laboriosam ut eius. Fugit, harum? Facere molestias rerum, laboriosam
					neque minima ipsum. Ex fuga deleniti sed blanditiis amet quos quod
					illo quis iste alias tenetur sunt, quo, totam dolore recusandae
					repellendus esse delectus praesentium architecto aliquid voluptatum
					voluptates ipsa beatae? Hic tempora pariatur, cum sed eius itaque
					asperiores nostrum. Aspernatur repellat omnis asperiores, totam vero,
					enim nisi fugiat cum autem nulla earum veniam!
				</Text>
			</View>
		</MainView>
	);
};

export default TermsOfService;

const styles = StyleSheet.create({
	container: {
		marginTop: Dimensions.get("window").height * 0.12,
	},

	headerText: {
		fontSize: 28,
		font: font.fontFamily,
		color: color.primary,
		textAlign: "left",
		fontWeight: "light",
		marginVertical: 10,
	},

	termsContent: {
		fontFamily: font.fontFamily,
		fontSize: 16,
		color: color.black,
		textAlign: "left",
	},
});
