import React from 'react';
import './Home.css';


function Home() {
  
  return (
    <div className="home-container">
      <h1>Welcome to the Quiz App</h1>
      <p>Test your knowledge on various topics!</p>
      <input
        type="text"
        placeholder="Enter your name"
        className="name-input"
      />
      <button className="start-btn">
        Start Quiz
      </button>
    </div>
  );
}

export default Home;
 