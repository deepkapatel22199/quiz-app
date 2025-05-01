import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Results.css';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score = 0, total = 0 } = location.state || {};

  return (
    <div className="results-container">
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} / {total}</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
}

export default Results;
