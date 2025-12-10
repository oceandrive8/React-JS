import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ItemCard.css"; 

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/items/${item.id}`, {
      state: { item }
    });
  };

  return (
    <div className="item-card" onClick={handleClick}>
      <img
        src={item.image}
        alt={item.title}
        className="item-image"
      />

      <p className="item-title">{item.title}</p>
      <p className="item-artist">{item.artist}</p>
    </div>
  );
};

export default ItemCard;


