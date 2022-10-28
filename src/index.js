import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import ResetPage from "./pages/resetPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import SiteHeader from './components/siteHeader';
import PopularPeoplePage from './pages/popularPeoplePage';
import PersonDetailsPage from './pages/personDetailsPage';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { createRoot } from 'react-dom/client';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <SiteHeader />
    <MoviesContextProvider>
    <Routes>
      <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
      <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
      <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
      <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
      <Route path="/movies/popular" element={<PopularMoviesPage />} />
      <Route path="/movies/:id" element={<MoviePage />} />
      <Route path="/movies/home" element={<HomePage />} />
      <Route path="/people" element={<PopularPeoplePage />} />
      <Route path="/people/:id" element={<PersonDetailsPage />} />
      <Route exact path="/register" element={<RegisterPage />} />
      <Route exact path="/reset" element={<ResetPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={ <Navigate to="/" /> } />
    </Routes>
    </MoviesContextProvider>
  </BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  );
};

const rootElement = createRoot(  document.getElementById("root") )
rootElement.render(<App />);