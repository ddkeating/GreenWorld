import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import color from "../config/color";

const LoadingOverlay = ({ isLoading }) => {
	// Animation Handling via React Native built-in Animated API.
	const rotateAnim = useRef(new Animated.Value(0)).current;

	// Function to start the loading animation.
	const startLoadingAnimation = () => {
		Animated.loop(
			Animated.timing(rotateAnim, {
				toValue: 1,
				duration: 900,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();
	};

	// Interpolate the rotation value to animate the icon.
	const rotate = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	// UseEffect hook to start the loading animation when isLoading is true.
	useEffect(() => {
		if (isLoading) {
			startLoadingAnimation();
		}
	}, [isLoading]);

	// Return JSX directly
	return (
		isLoading && (
			<View style={styles.loadingContainer}>
				<View style={styles.iconWrapper}>
					<Animated.View
						style={{
							transform: [
								{ translateX: 48 / 2 }, // Move origin to bottom-right
								{ translateY: 48 / 2 },
								{ rotate }, // Apply rotation
								{ translateX: -48 / 2 }, // Move back to original position
								{ translateY: -48 / 2 },
							],
						}}
					>
						<Icon
							name="loading" // Quarter-circle icon
							size={48}
							color={color.primary}
							style={styles.loadingIcon}
						/>
					</Animated.View>
				</View>
			</View>
		)
	);
};

export default LoadingOverlay;

const styles = StyleSheet.create({
	loadingContainer: {
		position: "absolute",
		zIndex: 1,
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},

	iconWrapper: {
		position: "absolute",
		left: "45%",
	},

	loadingIcon: {
		position: "absolute",
		zIndex: 2,
	},
});
