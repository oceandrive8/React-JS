import React from "react";
import AlbumCard from "./albumcard";
import "./albums.css";

function Albums({ albums, onAlbumClick }) {
  return (
    <div className="albums-page">
      <div className="albums-container">
        {albums.length > 0 ? (
          albums.map((album) => (
            <AlbumCard
              key={album.collectionId || album.id}
              album={album}
              onAlbumClick={onAlbumClick}
            />
          ))
        ) : (
          <p className="no-results">No albums found.</p>
        )}
      </div>
      <footer className="albums-footer">
        Seventeen – Right Here
      </footer>
    </div>
  );
}

export default Albums;



