import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';


const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/quiz'); 
  };
  return (
    <div className="home-container">
      <h1>Welcome to the Quiz App</h1>
      <p>Test your knowledge on various topics!</p>
      <input
        type="text"
        placeholder="Enter your name"
        className="name-input"
      />
      <button className="start-btn" onClick={handleStart}>
        Start Quiz
      </button>
    </div>
  );
}

export default Home;
 