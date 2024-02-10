import React, { useEffect } from "react";
import narravia from "../images/narravia.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

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
		onAuthStateChanged(auth, (user) => {
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
	}, []);

	return (
		<div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10">
			<div className="w-screen m-3 flex justify-between">
				<img src={narravia} className="w-44 m-3" alt="Narravia Logo" />
				{user && (
					<div className="flex p-2 items-center">
						
						<button
							onClick={handleSignOut}
							className="font-bold text-red-800 ml-2 rounded-lg"
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
