import React, { useEffect } from "react";
import narravia from "../images/narravia.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constant";
import { SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				dispatch(removeUser());
				navigate("/");
			})
			.catch((error) => {
				console.error("Sign-out error:", error);
				// Handle sign-out error more gracefully, e.g., display an error message to the user
			});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName, photoURL } = user;
				dispatch(
					addUser({
						uid: uid,
						email: email,
						displayName: displayName,
						photoURL: photoURL,
					})
				);
				navigate("/browse");
			} else {
				dispatch(removeUser());
				navigate("/");
			}
		});
		return () => unsubscribe();
	}, []);

	const handleGptSearchClick = () => {
		// Toggle GPT Search
		dispatch(toggleGptSearchView());
	};

	const handleLanguageChange = (e) => {
		dispatch(changeLanguage(e.target.value));
	};

	return (
		<div className="absolute  flex-auto  py-4 bg-gradient-to-b from-black z-10 ">
			<div className="w-screen px-6 my- flex justify-between">
				<img src={narravia} className="w-40 m-1 mr-0" alt="Narravia Logo" />
				{user && (
					<div className="flex  items-center">
						{showGptSearch && (
							<select
								className="p-2 m-2 bg-gray-900 font-bold text-white"
								onChange={handleLanguageChange}
							>
								{SUPPORTED_LANGUAGES.map((lang) => (
									<option key={lang.identifier} value={lang.identifier}>
										{lang.name}
									</option>
								))}
							</select>
						)}
						<button
							className="py-2 px-4 mx-4 my-2 bg-fuchsia-950 font-bold text-white rounded-lg"
							onClick={handleGptSearchClick}
						>
							{showGptSearch ? "Homepage" : "GPT Search"}
						</button>
						<img  alt=""className="w-8 m-2 cursor-pointer" src={USER_AVATAR}></img>
						<button
							onClick={handleSignOut}
							className="md:font-bold text-red-800 ml-2 mr-12 text-white rounded-lg"
						>
							Sign Out
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
