import "./moviecard.css";

function MovieCard({ movie }) {
  return (
    <li className="movie-card">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="movie-poster"
      />
      <h3 className="movie-title">{movie.title}</h3>
      <p className="movie-year"> Year: {movie.year}</p>
      <p className="movie-desc">{movie.description}</p>
    </li>
  );
}

export default MovieCard;
