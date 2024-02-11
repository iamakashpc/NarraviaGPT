import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constant";
import { addUpComingMovies } from "../utils/moviesSlice";

const useUpComingMovies = () => {
	const dispatch = useDispatch();
    	const upComingMovies = useSelector(
				(store) => store.movies.upComingMovies
			);

	const getTopRatedMovies = async () => {
		const data = await fetch(
			"https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
			options
		);


		const json = await data.json();
		dispatch(addUpComingMovies(json.results));
	};
	useEffect(() => {
		!upComingMovies&&getTopRatedMovies();
	}, []);
};
export default useUpComingMovies;