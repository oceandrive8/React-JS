import React from "react";

function AlbumCard({ album, onAlbumClick }) {
  return (
    <div className="album-card" onClick={() => onAlbumClick(album)}>
      <img
        src={album.image}
        alt={album.title}
        className="album-cover"
      />
      <h3 className="album-title">{album.title}</h3>
      <p className="album-year">{album.year}</p>
    </div>
  );
}

export default AlbumCard;



