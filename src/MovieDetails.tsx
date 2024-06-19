import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "./utils/types";
import { fetchMovieDetails } from "./apiService";
import placeholderMovieImg from "../public/placeholder.jpg";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [details, setDetails] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        if (data) {
          setDetails(data);
        } else {
          console.error("No movie data found");
        }
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    };

    if (id) {
      getMovieDetails(); // Call getMovieDetails only if id is defined
    }
  }, [id]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Movie Details</h1>
      <h2>{details.name}</h2>
      {details.poster && details.poster.previewUrl ? (
        <img src={details.poster.previewUrl} alt={details.name} />
      ) : (
        <img src={placeholderMovieImg} alt={details.name} />
      )}
      <p>{details.description}</p>
      <div>
        <strong>Ratings:</strong>
        <ul>
          <li>KP: {details.rating.kp}</li>
          <li>IMDb: {details.rating.imdb}</li>
          <li>Film Critics: {details.rating.filmCritics}</li>
          <li>Russian Film Critics: {details.rating.russianFilmCritics}</li>
          <li>Await: {details.rating.await}</li>
        </ul>
      </div>
      <div>
        <strong>Genres:</strong>
        <ul>
          {details.genres.map((genre) => (
            <li key={genre.name}>{genre.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Year:</strong> {details.year}
      </div>
    </div>
  );
};

export default MovieDetails;
