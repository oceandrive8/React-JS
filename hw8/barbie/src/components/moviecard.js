import React from "react";
import { Link } from "react-router-dom";
import "../styles/moviecard.css";

function MovieCard({ movie }) {
  return (
    <li className="movie-card">
      <Link to={`/items/${movie.id}`}>
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{movie.year}</p>
      </Link>
    </li>
  );
}

export default MovieCard;





