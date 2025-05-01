import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Results.css';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total, winnings } = location.state || { score: 0, total: 0, winnings: 0 };

  return (
    <div className="results-container">
      <h1>🎉 Congratulations!</h1>
      <p>You answered {score} out of {total} correctly.</p>
      <h2>You won: 💰 ${winnings}</h2>
      <button onClick={() => navigate('/')}>Play Again</button>
    </div>
  );
}

export default Results;
