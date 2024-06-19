import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Movie } from "../utils/types";
import { fetchMovieDetails } from "../apiService";
import placeholderMovieImg from "../../public/placeholder.jpg";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
      getMovieDetails();
    }
  }, [id]);

  const handleBack = () => {
    navigate("/");
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <button onClick={handleBack}>Back</button>
      <h1>Movie Details</h1>
      <div className="movie-details">
        <h2>{details.name}</h2>
        {details.poster && details.poster.previewUrl ? (
          <img src={details.poster.previewUrl} alt={details.name} />
        ) : (
          <img src={placeholderMovieImg} alt={details.name} />
        )}
        <p>{details.description}</p>
        <div>
          <strong>Рейтинг:</strong>
          <ul>
            <li>KP: {details.rating.kp}</li>
            <li>IMDb: {details.rating.imdb}</li>
            <li>Film Critics: {details.rating.filmCritics}</li>
            <li>Russian Film Critics: {details.rating.russianFilmCritics}</li>
          </ul>
        </div>
        <div>
          <strong>Жанры:</strong>
          <ul>
            {details.genres.map((genre) => (
              <li key={genre.name}>{genre.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Год:</strong> {details.year}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
