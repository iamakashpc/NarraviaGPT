import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { options } from "../utils/constant";

const useNowPlayingMovies = () => {
	// Fetch Data from TMDB API and update store
	const dispatch = useDispatch();

	const getNowPlayingMovies = async () => {
		const data = await fetch(
			"https://api.themoviedb.org/3/movie/now_playing?page=1",
			options
		);
		const json = await data.json();
		dispatch(addNowPlayingMovies(json.results));
	};

	useEffect(() => {
		getNowPlayingMovies();
	}, []);
};

export default useNowPlayingMovies;
