import React from 'react';
import './Quiz.css';

const Quiz = () => {
  return (
    <div className="quiz-container">
      <h2>Question 1 of 10</h2>
      <p className="question">What is the capital of France?</p>
      
      <div className="options">
        <button className="option-btn">Paris</button>
        <button className="option-btn">Berlin</button>
        <button className="option-btn">Madrid</button>
        <button className="option-btn">Rome</button>
      </div>

      <div className="quiz-footer">
        <p>Score: 0</p>
        <p>Time Left: 30s</p>
      </div>
    </div>
  );
}

export default Quiz;
