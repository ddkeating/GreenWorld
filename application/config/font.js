import { Platform } from "react-native";

export default {
	fontFamily: Platform.OS === "android" ? "sans-serif-light" : "Arial",
};
