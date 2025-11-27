import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemById } from "../features/items/itemsSlice";
import "../styles/moviedetails.css";

function MovieDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedItem: movie,
    loadingItem: loading,
    errorItem: error,
  } = useSelector((state) => state.items);
  


  useEffect(() => {
    dispatch(fetchItemById(id));
  }, [id, dispatch]);

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




