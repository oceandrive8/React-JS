import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAll } from "../service/ItemsService";
import MovieCard from "./moviecard";
import "../styles/moviecard.css";
import "../styles/movielist.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAll();
        const filtered = q
          ? data.filter(m => m.title.toLowerCase().includes(q.toLowerCase()))
          : data;
        setMovies(filtered);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [q]);

  const handleSearch = e => {
    const value = e.target.value.trim();
    // Use URLSearchParams for safety
    const params = new URLSearchParams();
    if (value) params.set("q", value);
    setSearchParams(params);
  };

  return (
    <div className="list-box">
      <h1 className="title">🎀 Barbie Movie List 🎀</h1>

      <div className="bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={q}
          onChange={handleSearch}
          className="input"
        />
      </div>

      {loading && <p className="loading">Loading pink magic...</p>}
      {error && <p className="error">💔 {error}</p>}

      {!loading && !error && (
        <ul className="list">
          {movies.length
            ? movies.map(m => <MovieCard key={m.id} movie={m} />)
            : <p>No movies found.</p>}
        </ul>
      )}
    </div>
  );
}

export default MovieList;










