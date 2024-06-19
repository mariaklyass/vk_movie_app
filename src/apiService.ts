import axios from "axios";

const API_BASE_URL = "https://api.kinopoisk.dev/v1.4";
const apiKey = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (
  page: number,
  limit: number,
  yearRange?: string,
  ratingRange?: string,
  genres?: string[]
) => {
  let url = `${API_BASE_URL}/movie?page=${page}&limit=${limit}&selectFields=poster&selectFields=id&selectFields=name&selectFields=description&selectFields=year&selectFields=rating&selectFields=genres&notNullFields=name&notNullFields=description`;

  if (yearRange && yearRange !== "all" && yearRange !== "") {
    url += `&year=${yearRange}`;
  }

  if (ratingRange && ratingRange !== "allRatings" && ratingRange !== "") {
    url += `&rating.imdb=${ratingRange}`;
  }

  if (genres && genres.length > 0) {
    genres.forEach((genre) => {
      url += `&genres.name=${genre}`;
    });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies: ", error);
    throw error;
  }
};

export async function fetchMovieDetails(id: string) {
  const url = `${API_BASE_URL}/movie/${id}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies: ", error);
    throw error;
  }
}
