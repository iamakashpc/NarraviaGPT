import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { BG_URL, USER_AVATAR } from "../utils/constant";

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();

	const name = useRef(null);
	const email = useRef(null);
	const password = useRef(null);

	const handleButtonClick = async () => {
		const emailValue = email.current.value;
		const passwordValue = password.current.value;
		const message = checkValidData(emailValue, passwordValue);
		setErrorMessage(message);
		if (message) return;

		try {
			if (!isSignInForm) {
				// Sign Up Logic
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					emailValue,
					passwordValue
				);
				const user = userCredential.user;
				await updateProfile(user, {
					displayName: name.current.value,
					photoURL: USER_AVATAR,
				});
				navigate("/browse");
			} else {
				// Sign In Logic
				const userCredential = await signInWithEmailAndPassword(
					auth,
					emailValue,
					passwordValue
				);
				const user = userCredential.user;
				
				navigate("/browse");
			}
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			setErrorMessage(`${errorCode}-${errorMessage}`);
		}
	};

	const toggleSignInForm = () => {
		setIsSignInForm(!isSignInForm);
	};

	return (
		<div>
			<Header />
			<div className="absolute ">
				<img className="h-screen object-cover md:h-full" src={BG_URL} alt="logo" />
			</div>
			<form
				onSubmit={(e) => e.preventDefault()}
				className=" w-[80%]  md:w-3/12 absolute p-8 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
			>
				<h1 className="font-bold text-3xl py-4">
					{isSignInForm ? "Sign In" : "Sign Up"}
				</h1>

				{!isSignInForm && (
					<input
						ref={name}
						type="text"
						placeholder="Full Name"
						className="p-4 my-4 w-full bg-gray-700"
					/>
				)}
				<input
					ref={email}
					type="email"
					placeholder="Email Address"
					className="p-4 my-4 w-full bg-gray-700"
				/>
				<input
					ref={password}
					type="password"
					placeholder="Password"
					className="p-4 my-4 w-full bg-gray-700"
				/>
				<p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
				<button
					className="p-4 my-6 bg-red-700 w-full rounded-lg"
					onClick={handleButtonClick}
				>
					{isSignInForm ? "Sign In" : "Sign Up"}
				</button>
				<p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
					{isSignInForm
						? "New to Netflix? Sign Up Now"
						: "Already registered? Sign In Now."}
				</p>
			</form>
		</div>
	);
};

export default Login;
