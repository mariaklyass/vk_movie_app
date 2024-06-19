import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../apiService";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "../utils/types";
import { Link } from "react-router-dom";
import { allGenres } from "../utils/genres";
import "./MovieList.css";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const limit = 50;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRatingRange, setSelectedRatingRange] =
    useState<string>("allRatings");
  const [selectedYearRange, setSelectedYearRange] = useState<string>("all");

  const navigate = useNavigate();

  const handlePagination = (page: number): void => {
    setCurrentPage(page);
  };

  const handleMovieClick = (id: number) => {
    navigate(`/movies/${id}`);
  };

  useEffect(() => {
    const getAllMovies = async (page: number, limit: number) => {
      setLoading(true);
      try {
        const data = await fetchMovies(
          page,
          limit,
          selectedYearRange,
          selectedRatingRange,
          selectedGenres
        );
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
  }, [
    currentPage,
    limit,
    selectedGenres,
    selectedRatingRange,
    selectedYearRange,
  ]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedGenres(selectedOptions);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRatingRange(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYearRange(event.target.value);
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedRatingRange("allRatings");
    setSelectedYearRange("all");
  };

  return (
    <div className="movie-list-container">
      <h1>Все фильмы</h1>

      <div className="filters">
        <div>
          <label>Жанры:</label>
          <select multiple onChange={handleGenreChange} value={selectedGenres}>
            {allGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Рейтинг:</label>
          <select value={selectedRatingRange} onChange={handleRatingChange}>
            <option value="">Рейтинг</option>
            <option value="allRatings">Любой рейтинг</option>
            <option value="9-10">9-10</option>
            <option value="6-8">6-8</option>
            <option value="3-5">3-5</option>
            <option value="0-2">0-2</option>
          </select>
        </div>

        <div>
          <label>Дата выхода:</label>
          <select value={selectedYearRange} onChange={handleYearChange}>
            <option value="">Выберите год</option>
            <option value="all">Все годы</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2010-2019">2010-2019</option>
            <option value="2000-2009">2000-2009</option>
            <option value="1990-1999">1990-1999</option>
          </select>
        </div>

        <div>
          <button onClick={handleClearFilters}>Очистить фильтры</button>
        </div>
      </div>

      <div className="movie-list">
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
      <div className="pagination-buttons">
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
