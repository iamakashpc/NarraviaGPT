import React from "react";
import narravia from "../images/narravia.png";
const Header = () => {
	return (
		<div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10">
			<img src={narravia} className="w-44 m-5" alt=""></img>
		</div>
	);
};

export default Header;
