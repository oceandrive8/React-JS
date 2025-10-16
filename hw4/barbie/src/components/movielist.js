import React, { useState } from "react";
import Card from "./moviecard";
import "./movielist.css";

function List() {
  const [items, setItems] = useState([]);
  const [txt, setTxt] = useState("");
  const [found, setFound] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/oceandrive8/Homify/refs/heads/main/barbiemovies.json"
      );
      const data = await res.json();
      await new Promise((r) => setTimeout(r, 1000));
      setItems(data.movies || []);
    } catch (err) {
      console.error("Load error:", err);
    }
    setLoading(false);
  };

  const search = async () => {
    setLoading(true);
    let list = items;
    if (!items.length) list = await load();

    const res = list.filter((m) =>
      m.title.toLowerCase().includes(txt.toLowerCase())
    );
    setFound(res);
    setShow(true);
    setLoading(false);
  };

  const clear = () => {
    setTxt("");
    setShow(false);
  };

  return (
    <div className="list-box">
      <h1 className="title">🎀 Barbie Movie List 🎀</h1>

      <button onClick={load} className="btn-load">
        💕 Load Movies 💕
      </button>

      <div className="bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          className="input"
        />
        <button onClick={search} className="btn-search">🔍</button>
        {txt && <button onClick={clear} className="btn-clear">Clear</button>}
      </div>

      {loading ? (
        <p className="loading">Loading pink magic...</p>
      ) : (
        <ul className="list">
          {(show ? found : items).map((m, i) => (
            <Card key={i} movie={m} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;






