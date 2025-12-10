import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery, setCurrentPage } from "../store/itemsSlice";
import { useDebounce } from "../hooks/useDebounce";
import "../styles/Navbar.css";

import keyringIcon from "../assets/keyring.png";
import searchIcon from "../assets/search.png";
import profileIcon from "../assets/profile.png";
import bulbIcon from "../assets/bulb.png";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
    dispatch(setCurrentPage(1));
  }, [debouncedQuery, dispatch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    dispatch(setSearchQuery(query));
    dispatch(setCurrentPage(1));
  };

  return (
    <nav className="navbar">
      <img
        src={keyringIcon}
        alt="items"
        className="nav-icon"
        onClick={() => navigate("/items")}
      />

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        <img
          src={searchIcon}
          alt="search"
          className="search-icon"
          onClick={handleSearchClick}
        />
      </div>

      <div className="navbar-right">
        <img
          src={profileIcon}
          alt="profile"
          className="nav-icon"
          onClick={() => navigate("/profile")}
        />
        <img
          src={bulbIcon}
          alt="home"
          className="nav-icon"
          onClick={() => navigate("/")}
        />
      </div>
    </nav>
  );
};

export default Navbar;



