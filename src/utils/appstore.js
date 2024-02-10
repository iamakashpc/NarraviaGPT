import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice"; // Correct import path for movieSlice

const appStore = configureStore({
	reducer: {
		user: userReducer,
		movies: moviesReducer,
	},
});

export default appStore;
