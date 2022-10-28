import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import useSimilarMovies from '../hooks/useSimilarMovies';
import { useLocation } from "react-router-dom";
import Spinner from "../components/spinner";
import { useQuery } from "react-query";
import { getSimilarMovies } from "../api/tmdb-api";
const SimilarMoviesPage = (props) => {
    const location = useLocation();
    const movieId = location.state.movieId;
    
  const { data: movies, error, isLoading, isError } = useQuery(
    ["similar movies", { id: movieId }],
    getSimilarMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <PageTemplate
      title="No. Similar Movies"
      movies={movies} 
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default SimilarMoviesPage;