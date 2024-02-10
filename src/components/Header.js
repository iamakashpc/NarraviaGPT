import React from "react";
import narravia from "../images/narravia.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Header = () => {
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				navigate("/");
			})
			.catch((error) => {
				navigate("/error");
			});
	};
	return (
		<div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10">
			<div className=" w-screen  m-3	 flex justify-between">
				<img src={narravia} className="w-44 m-5" alt=""></img>
				{user && (
					<div className="flex p-2">
						<img className="w-12 h-12" alt="usericon" src={user?.photoURL} />
						<button onClick={handleSignOut} className="font-bold text-white ">
							(Sign Out)
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
