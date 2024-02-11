import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constant";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
	const dispatch = useDispatch();
	const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

	const getTopRatedMovies = async () => {
		const data = await fetch(
			"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
			options
		);

		const json = await data.json();
		dispatch(addTopRatedMovies(json.results));
	};
	useEffect(() => {
		!topRatedMovies && getTopRatedMovies();
	}, []);
};
export default useTopRatedMovies;
