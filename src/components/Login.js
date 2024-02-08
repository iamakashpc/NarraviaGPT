import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
		<div>
			<Header />
			<div class="absolute">
				<Header />
				<img
					 alt ="" class="w-full h-auto"
					src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
				/>
				<div class="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
			</div>

			<form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
				<h1 className="font-bold text-3xl py-4">
					{isSignInForm ? "Sign In" : "Sign Up"}
				</h1>

				{!isSignInForm && (
					<input
						type="text"
						placeholder="Full Name"
						className="p-4 my-4 w-full bg-gray-900"
					/>
				)}
				<input
					type="text"
					placeholder="Email Address"
					className="p-4 my-4 w-full bg-gray-900"
				/>
				<input
					type="password"
					placeholder="Password"
					className="p-4 my-4 w-full bg-gray-900"
				/>
				<button className="p-4 my-6 bg-red-700 w-full rounded-lg">
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
