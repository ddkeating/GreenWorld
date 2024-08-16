// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {
	initializeAuth,
	getReactNativePersistence,
	getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCPUh8POcShgn2VfC--kFN8PHMI-Dx-sh8",
	authDomain: "greenworld-8b061.firebaseapp.com",
	projectId: "greenworld-8b061",
	storageBucket: "greenworld-8b061.appspot.com",
	messagingSenderId: "696811034191",
	appId: "1:696811034191:web:058b75eabb34373fc8bc3a",
};

// Initialize Firebase and Authnetication.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
