import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAll } from "../service/ItemsService";
import MovieCard from "./moviecard";
import "../styles/moviecard.css";
import "../styles/movielist.css";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [input, setInput] = useState(q);

  const handleSearchClick = async () => {
    setSearchParams(input ? { q: input } : {});
    setLoading(true);
    setError(null);

    try {
      const data = await getAll();
      const filtered = input
        ? data.filter(m => m.title.toLowerCase().includes(input.toLowerCase()))
        : data;
      setMovies(filtered);
    } catch (e) {
      setError(e.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAll();
        setMovies(q ? data.filter(m => m.title.toLowerCase().includes(q.toLowerCase())) : data);
      } catch (e) {
        setError(e.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []); 

  return (
    <div className="list-box">
      <h1 className="title">🎀 Barbie Movie List 🎀</h1>

      <div className="bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="input"
        />
        <button onClick={handleSearchClick} className="btn-search">Search</button>
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











