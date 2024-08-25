import {} from "dotenv/config";
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const baseRequestParams = `?api_key=${MOVIE_API_KEY}`;

export const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const urlToFetch =
    TMDB_API_BASE_URL + genreRequestEndpoint + baseRequestParams;

  try {
    const response = await fetch(urlToFetch, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch (err) {
    console.log("Error getting movie genres", err);
  }
};

// get movies by genreIds /include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28,35

export const getMoviesByGenreIds = async ({
  genreIds,
  adult = false,
  page = 1,
}) => {
  const moviesByGenreIdEndpoint = "/discover/movie";
  const requestParams = `&include_adult=${adult}&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreIds}`;

  const urlToFetch =
    TMDB_API_BASE_URL +
    moviesByGenreIdEndpoint +
    baseRequestParams +
    requestParams;

  if (!genreIds) {
    return new Error("No movie genre entered.");
  }

  try {
    const response = await fetch(urlToFetch, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;

      return movies;
    }
  } catch (err) {
    console.log(`Error finding movies with genre ids ${genreIds}`);
  }
};

// get movie by name query=blue&include_adult=false&page=1
export const getMovie = async ({ name, adult = false, page = 1 }) => {
  if (!name) {
    return new Error("No movie search term entered.");
  }
  const getMovieEndpoint = "/search/movie?";
  const requestParams = `&query=${name}&include_adult=${adult}&page=${page}`;
  const urlToFetch =
    TMDB_API_BASE_URL + getMovieEndpoint + baseRequestParams + requestParams;
  try {
    const response = await fetch(urlToFetch, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      //Find movie
      const movies = jsonResponse.results;
      return movies;
    }
  } catch (err) {
    console.log(`Error finding movie with ${name}`, err);
  }
};
