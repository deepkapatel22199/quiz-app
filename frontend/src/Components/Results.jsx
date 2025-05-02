import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Results.css";

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="results-container">
      <h2>Quiz Over!</h2>
      <h3>You won ₹{state?.winnings || 0}</h3>
      <button onClick={() => navigate("/")}>Play Again</button>
    </div>
  );
};

export default Results;
