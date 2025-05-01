import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions';
import QuestionCard from './QuestionCard';
import './Quiz.css';

const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [winnings, setWinnings] = useState(0);
    const navigate = useNavigate();

    const handleAnswer = (selected) => {
        const correct = questions[currentIndex].correctAnswer;
        if (selected === correct) {
            setScore(score + 1);
            setWinnings(winnings + 100);
        }
        const next = currentIndex + 1;
        if (next < questions.length) {
          setCurrentIndex(next);
        } else {
          navigate('/results', { state: { score, total: questions.length, winnings: winnings + (selected === correct ? 100 : 0) } });
        }
      };
  return (
    <div className="quiz-container">
        <h2>Question {currentIndex + 1} / {questions.length}</h2>
        <h3>Current Winnings: ${winnings}</h3>
        <QuestionCard
            question={questions[currentIndex].question}
            options={questions[currentIndex].options}
            onAnswer={handleAnswer}
        />
    </div>
  );
}

export default Quiz;
