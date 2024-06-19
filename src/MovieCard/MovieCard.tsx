import React from "react";
import { Movie } from "../utils/types";
import placeholderMovieImg from "../../public/placeholder.jpg";
import "./MovieCard.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card">
      {movie.poster && movie.poster.previewUrl ? (
        <img src={movie.poster.previewUrl} alt={movie.name} />
      ) : (
        <img src={placeholderMovieImg} alt={movie.name} />
      )}

      <h2>{movie.name}</h2>
      <p>{movie.description}</p>

      <ul className="rating">
        {" "}
        Рейтинг:
        <li>KP: {movie.rating.kp}</li>
        <li>IMDb: {movie.rating.imdb}</li>
        <li>Кинокритики: {movie.rating.filmCritics}</li>
        <li>Русские кинокритики: {movie.rating.russianFilmCritics}</li>
      </ul>

      <div className="card-bottom">
        <strong>Год:</strong> {movie.year}
      </div>
    </div>
  );
};

export default MovieCard;
