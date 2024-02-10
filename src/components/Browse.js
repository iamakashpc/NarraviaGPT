import React, { useEffect } from "react";
import Header from "./Header";
import { options } from "../utils/constant";

const Browse = () => {
	const nowPlayingMovies = async () => {
		const data = await fetch(
			"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
			options
		);
		const json = await data.json();
		console.log(json.results);
	};

	useEffect(() => {
		nowPlayingMovies();
	}, []);

	return <Header />;
};

export default Browse;
