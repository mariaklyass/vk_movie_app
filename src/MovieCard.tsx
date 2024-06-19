import React from "react";
import { Movie } from "./utils/types";
import placeholderMovieImg from "../public/placeholder.jpg";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card">
      <h2>{movie.name}</h2>
      {movie.poster && movie.poster.previewUrl ? (
        <img src={movie.poster.previewUrl} alt={movie.name} />
      ) : (
        <img src={placeholderMovieImg} alt={movie.name} />
      )}
      <p>{movie.description}</p>
      <div>
        <strong>Ratings:</strong>
        <ul>
          <li>KP: {movie.rating.kp}</li>
          <li>IMDb: {movie.rating.imdb}</li>
          <li>Film Critics: {movie.rating.filmCritics}</li>
          <li>Russian Film Critics: {movie.rating.russianFilmCritics}</li>
          <li>Await: {movie.rating.await}</li>
        </ul>
      </div>
      {/* <div>
        {movie.genres && movie.genres.length > 0 && (
          <div>
            <strong>Genres:</strong>
            <ul>
              {movie.genres.map((genre) => (
                <li key={genre.name}>{genre.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div> */}
      <div>
        <strong>Year:</strong> {movie.year}
      </div>
    </div>
  );
};

export default MovieCard;
