"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { getGenres, getMoviesByGenreIds } from "@/utils/api";
import { MovieDetails } from "./components/MovieDetails";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState([]);

  const handleChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof selectedGenre);
    try {
      const movieData = await getMoviesByGenreIds({ genreIds: selectedGenre });
      setMovies(movieData);
    } catch (error) {
      console.log("Error getting movie by ids", error);
    }
  };

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreData = await getGenres();
        setGenres(genreData);
      } catch (err) {
        console.log("Error loading genres", err);
      }
    };

    loadGenres();
  }, []);

  return (
    <div>
      <div className="heading">
        <h1>MovieFlix</h1>
      </div>
      <div>
        <h2>Find movies you want to see</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <p>Find Movies by Genre</p>
        {genres?.length > 1 ? (
          <select value={selectedGenre} onChange={handleChange}>
            <option value="">--Please choose a genre--</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        ) : (
          <div>loading</div>
        )}
        <button type="submit" value="submit">
          Submit
        </button>
      </form>

      {movies && movies.length > 0 && (
        <div>
          {movies.map((movie, i) => (
            <MovieDetails key={i} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
