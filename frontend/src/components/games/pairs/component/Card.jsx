import React from "react";
import "./Card.css";
export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card relative">
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front w-full block border-2 border-solid border-white rounded-md"
          src={card.src}
          alt="card front"
        />
        <img
          onClick={handleClick}
          className="back w-full block border-2 border-solid border-white rounded-md"
          src="/img/Card_back.png"
          alt="card front"
        />
      </div>
    </div>
  );
}
