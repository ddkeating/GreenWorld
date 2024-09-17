import {
	StyleSheet,
	Text,
	View,
	Modal,
	Dimensions,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import color from "../config/color";
import font from "../config/font";
import CustomBtn from "./CustomBtn";

const CustomModal = ({
	text,
	textPlaceholder,
	modalVisible,
	setModalVisible,
	onTextChange,
	onConfirm,
}) => {
	const [textVisible, setTextVisible] = useState(false);
	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};

	const handleTextChange = (text) => {
		onTextChange(text);
	};

	const handleConfirmPress = () => {
		onConfirm();
	};

	return (
		<View>
			<View style={styles.centeredView}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.container}>
							<Text style={styles.modalText}>{text}</Text>
							<View style={styles.textEntryContainer}>
								<TextInput
									placeholder={textPlaceholder}
									placeholderTextColor={"#A9A9A9"}
									style={styles.textEntry}
									onChangeText={(text) => handleTextChange(text)}
									secureTextEntry={!textVisible}
									textContentType="newPassword"
								/>
								<TouchableOpacity onPress={() => setTextVisible(!textVisible)}>
									<Icon
										name={textVisible ? "eye" : "eye-off"}
										size={28}
										color={color.primary}
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.btnContainer}>
								<CustomBtn
									color={color.primary}
									textColor={color.white}
									title="Confirm"
									onPress={handleConfirmPress}
								/>
								<CustomBtn
									color={color.red}
									textColor={color.white}
									title="Cancel"
									onPress={toggleModal}
								/>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</View>
	);
};

export default CustomModal;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
		zIndex: 2,
	},
	container: {
		width: Dimensions.get("window").width * 0.8,
		height: Dimensions.get("window").height * 0.4,
		backgroundColor: color.white,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		padding: 20,
	},
	modalText: {
		fontSize: 24,
		color: color.primary,
		fontFamily: font.fontFamily,
		fontWeight: "light",
		textAlign: "center",
	},
	textEntryContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 5,
		borderBottomWidth: 1,
		borderBottomColor: color.primary,
		marginVertical: 40,
	},
	textEntry: {
		fontSize: 24,
		color: color.primary,
		fontFamily: font.fontFamily,
		fontWeight: "bold",
		textAlign: "left",
		flexGrow: 1,
		width: "90%",
	},
	btnContainer: {
		gap: 10,
	},
});
