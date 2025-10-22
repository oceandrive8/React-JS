import React from "react";
import "./songs.css";

function Songs({ album, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{album.title}</h2>
        <img src={album.image} alt={album.title} className="album-image" />

        <ul className="song-list">
          {album.songs && album.songs.length > 0 ? (
            album.songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))
          ) : (
            <p>No songs found 😢</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Songs;

