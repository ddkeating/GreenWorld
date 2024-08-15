// Component for handling a consistent background image and overlay for the application stack.
import { View, StyleSheet, ImageBackground } from "react-native";

import backgroundImg from "../assets/images/background.png";
import font from "../config/font";

export default MainView = ({ children }) => {
	return (
		<ImageBackground source={backgroundImg} style={styles.container}>
			<View style={styles.overlay}>{children}</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(255,255,255,.85)",
		padding: 10,
		fontFamily: font.fontFamily,
	},
});
