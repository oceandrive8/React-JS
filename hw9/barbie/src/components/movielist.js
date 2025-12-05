import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../features/items/itemsSlice";
import MovieCard from "./moviecard";
import "../styles/moviecard.css";
import "../styles/movielist.css";

export default function MovieList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || ""; 
  const [input, setInput] = useState(q);


  const { list: movies, loadingList: loading, errorList: error } = useSelector(
    (state) => state.items
  );


  useEffect(() => {
    dispatch(fetchItems(q));
  }, [q, dispatch]);

  const handleSearchClick = () => {
    setSearchParams(input ? { q: input } : {}); 
    dispatch(fetchItems(input)); 
  };

  return (
    <div className="list-box">
      <h1 className="title">🎀 Barbie Movie List 🎀</h1>

      <div className="bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
        />
        <button onClick={handleSearchClick} className="btn-search">Search</button>
      </div>

      {loading && <p className="loading">Loading pink magic...</p>}
      {error && <p className="error">💔 {error}</p>}

      {!loading && !error && (
        <ul className="list">
          {movies.length
            ? movies.map((m) => <MovieCard key={m.id} movie={m} />)
            : <p>No movies found.</p>}
        </ul>
      )}
    </div>
  );
}











