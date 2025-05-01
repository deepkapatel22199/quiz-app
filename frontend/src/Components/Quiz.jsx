import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions';
import QuestionCard from './QuestionCard';
import './Quiz.css';

const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    const handleAnswer = (answer) => {
        if (answer === questions[currentIndex].correctAnswer) {
          setScore(score + 1);
        }
        const next = currentIndex + 1;
        if (next < questions.length) {
          setCurrentIndex(next);
        } else {
          navigate('/results', { state: { score, total: questions.length } });
        }
      };
  return (
    <div className="quiz-container">
      <QuestionCard
        question={questions[currentIndex].question}
        options={questions[currentIndex].options}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default Quiz;
