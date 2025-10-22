import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Albums from "./components/albums";
import Songs from "./components/songs";
import "./App.css";

function App() {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://raw.githubusercontent.com/oceandrive8/Homify/refs/heads/main/svt.json");
        if (!res.ok) throw new Error("Failed to fetch albums");
        const data = await res.json();
        setAlbums(data.slice(0, 12));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredAlbums = albums.filter((a) =>
    a.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="App">
      <Header onSearchChange={handleSearch} />
      {loading && <p className="status">Loading albums...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && !error && (
        <Albums albums={filteredAlbums} onAlbumClick={handleAlbumClick} />
      )}
      {selectedAlbum && (
        <Songs album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
      )}
    </div>
  );
}

export default App;



