import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getById } from "../service/ItemsService";
import "../styles/moviedetails.css";

function MovieDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getById(id);
        setMovie(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id]);

  if (loading) return <p className="loading">Loading details...</p>;
  if (error) return <p className="error">💔 {error}</p>;
  if (!movie) return <p className="error">Movie not found.</p>;

  return (
    <div className="detail-box">
      <div className="back-container">
        <button onClick={() => nav(-1)} className="btn-back">← Back</button>
      </div>

      <h1 className="detail-title">{movie.title}</h1>
      <img src={movie.posterUrl} alt={movie.title} className="detail-img" />

      <div className="detail-info">
        <p><b>Year:</b> {movie.year}</p>
        <p><b>Director:</b> {movie.director}</p>
        <p><b>Genre:</b> {movie.genre}</p>
        <p><b>Duration:</b> {movie.duration}</p>
        <p><b>Rating:</b> {movie.rating}</p>
        <p><b>Language:</b> {movie.language}</p>
        <p><b>Description:</b> {movie.description}</p>
      </div>
    </div>
  );
}

export default MovieDetail;



