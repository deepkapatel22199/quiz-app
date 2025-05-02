import React from "react";
import "./QuestionCard.css";

const QuestionCard = ({ question, onAnswer, locked }) => {
  return (
    <div className="question-card">
      <h2>{question.question}</h2>
      <div className="options">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(opt)}
            disabled={locked}
            className="option-button"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
