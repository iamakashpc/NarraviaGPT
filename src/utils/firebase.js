// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyA-XiKpLX2AVC0knZl73DmMHIlghqK8lrE",
	authDomain: "narravia-gpt.firebaseapp.com",
	projectId: "narravia-gpt",
	storageBucket: "narravia-gpt.appspot.com",
	messagingSenderId: "366345378139",
	appId: "1:366345378139:web:1cbc649d580c8f1d8ea27e",
	measurementId: "G-0LB74R6SJK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export  default app;
export const auth = getAuth();