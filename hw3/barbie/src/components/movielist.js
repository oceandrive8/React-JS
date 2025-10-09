import React, { useState } from "react";
import MovieCard from "./moviecard";
import "./movielist.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/oceandrive8/Homify/refs/heads/main/barbiemovies.json"
      );
      const data = await response.json();

      
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMovies(data.movies || []);
    } catch (error) {
      console.error("Error fetching Barbie movies:", error);
    }
    setLoading(false);
  };

  return (
    <div className="movie-list-container">
      <h1 className="title">🎀 Barbie Movie List 🎀</h1>

      <button onClick={fetchMovies} className="load-btn">
        💕 Load Barbie Movies 💕
      </button>

      {loading ? (
        <p className="loading">Loading pink magic...</p>
      ) : (
        <ul className="movie-list">
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;



