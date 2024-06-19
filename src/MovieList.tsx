import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "./apiService";
import MovieCard from "./MovieCard";
import { Movie } from "./utils/types";
import { Link } from "react-router-dom";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [limit, setLimit] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const handlePagination = (page: number): void => {
    setCurrentPage(page);
  };

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  useEffect(() => {
    const getAllMovies = async (page: number, limit: number) => {
      setLoading(true);
      try {
        const data = await fetchMovies(page, limit);
        if (data && data.docs) {
          setMovies(data.docs);
        } else {
          console.error("No movies data found");
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies: ", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    getAllMovies(currentPage, limit);
  }, [currentPage, limit, genres]);

  return (
    <div>
      <h1>Movie List</h1>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              onClick={() => handleMovieClick(movie.id)}
            >
              <MovieCard movie={movie} />
            </Link>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
      <div>
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button onClick={() => handlePagination(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default MovieList;
