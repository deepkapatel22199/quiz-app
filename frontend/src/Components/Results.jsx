import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Results.css';  // Import a custom CSS file for styling

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const winnings = location.state?.winnings ?? 0;


  return (
    <div className="result-page">
      <div className="result-container">
        <h1 className="result-title">🎉 Game Over!</h1>
        <h2 className="result-subtitle">Your Final Winnings:</h2>
        <h3 className="result-amount">${winnings}</h3>
        <p className="result-message">
          {winnings > 0
            ? "Great job! You answered the questions correctly."
            : "Oops! Looks like you didn't get the answers right. Better luck next time!"}
        </p>
        <button 
          className="play-again-btn" 
          onClick={() => navigate("/")}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Result;
