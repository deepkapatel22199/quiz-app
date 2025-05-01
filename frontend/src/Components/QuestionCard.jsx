import React from 'react';
import './QuestionCard.css';

function QuestionCard({ question, options, onAnswer }) {
  return (
    <div className="question-card">
      <h2>{question}</h2>
      <div className="options">
        {options.map((opt, index) => (
          <button key={index} onClick={() => onAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
