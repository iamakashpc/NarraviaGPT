// Login.js

import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../utils/firebase";

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

	const name = useRef(null);
	const email = useRef(null);
	const password = useRef(null);

	const handleButtonClicked = () => {
		const message = checkValidData(
			isSignInForm ? null : name.current.value,
			email.current.value,
			password.current.value
		);
		setErrorMessage(message);
		if (message) return;

		
		if (isSignInForm) {
			// Implement sign-in logic here

			signInWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value
			)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					console.log(user)
					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMessage(errorMessage);
				});
			
		} else {
			createUserWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value
			)
				.then((userCredential) => {
					// Signed up
					const user = userCredential.user;
					console.log(user);
					// Additional logic after successful sign up
				})
				.catch((error) => {
					const errorMessage = error.message;
					console.error(error.code, errorMessage);
					setErrorMessage(errorMessage);
				});
			
		}
	};

	const toggleSignInForm = () => {
		setIsSignInForm(!isSignInForm);
	};

	return (
		<div>
			<Header />
			<div className="absolute">
				<Header />
				<img
					alt=""
					className="w-full h-auto"
					src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
			</div>

			<form
				onSubmit={(e) => e.preventDefault()}
				className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
			>
				<h1 className="font-bold text-3xl py-4">
					{isSignInForm ? "Sign In" : "Sign Up"}
				</h1>

				{!isSignInForm && (
					<input
						ref={name}
						type="text"
						placeholder="Full Name"
						className="p-4 my-4 w-full bg-gray-900"
					/>
				)}
				<input
					ref={email}
					type="text"
					placeholder="Email Address"
					className="p-4 my-4 w-full bg-gray-900"
				/>
				<input
					ref={password}
					type="password"
					placeholder="Password"
					className="p-4 my-4 w-full bg-gray-900"
				/>
				<p className="text-red-600 font-extralight">{errorMessage}</p>

				<button
					className="p-4 my-6 bg-red-700 w-full rounded-lg"
					onClick={handleButtonClicked}
				>
					{isSignInForm ? "Sign In" : "Sign Up"}
				</button>
				<p className="py-4 cursor-pointer font-bold" onClick={toggleSignInForm}>
					{isSignInForm
						? "New to Narravia ? Sign Up Now"
						: "Already registered? Sign In Now."}
				</p>
			</form>
		</div>
	);
};

export default Login;
