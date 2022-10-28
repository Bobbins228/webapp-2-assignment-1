import React from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getRecommendedMovies, getSimilarMovies } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  const { data: similarMovies } = useQuery(
    ["similar movies", { id: id }],
    getSimilarMovies
  );

  const { data: recommendedMovies } = useQuery(
    ["recommended movies", { id: id }],
    getRecommendedMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} similarMovies={similarMovies} recommendedMovies={recommendedMovies}/>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;