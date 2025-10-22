import React, { useState } from "react";
import "./songs.css";

function Songs({ album, onClose }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  if (selectedVideo) {
  return (
    <div className="modal-overlay">
      <div className="modal video-modal-wrapper">
        <button className="close-btn" onClick={closeVideo}>×</button>
        <div className="video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{album.title}</h2>
        <img src={album.image} alt={album.title} className="album-image" />
        <ul className="song-list">
          {album.songs && album.songs.length > 0 ? (
            album.songs.map((song, i) => (
              <li key={i} onClick={() => openVideo(song.videoId)}>
                {song.title}
              </li>
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





