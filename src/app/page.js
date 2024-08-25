"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { getGenres } from "@/utils/api";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

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

  // console.log('selected genre', selectedGenre)
  return (
    <div>
      <div className="heading">
        <h1>MovieFlix</h1>
      </div>
      <div>
        <h2>Find movies you want to see</h2>
      </div>
      <div>
        <p>Find Movies by Genre</p>
        {genres?.length > 1 ? (
          <select>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        ) : (
          <div>loading </div>
        )}
      </div>
    </div>
  );
}
