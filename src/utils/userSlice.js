import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		addUser: (state, action) => {
			return action.payload;
		},
		removeUser: (state, action) => {
			return null; // This should be initialState instead of null
		},
	},
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
