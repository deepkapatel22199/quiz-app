import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions';
import QuestionCard from './QuestionCard';
import './Quiz.css';

const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [winnings, setWinnings] = useState(0);
    const [message, setMessage] = useState(""); 
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const handleAnswer = (selectedAnswer) => {
        const currentQuestion = questions[currentIndex];
      
        if (selectedAnswer === currentQuestion.correctAnswer) {
          const prize = 100;
          const newWinnings = winnings + prize;
          setWinnings(newWinnings);
          setMessage(`🎉 Correct! You won $${prize}`);
          setShowMessage(true);
      
          setTimeout(() => {
            setShowMessage(false);
            if (currentIndex + 1 < questions.length) {
              setCurrentIndex(prev => prev + 1);
            } else {
              navigate("/result", { state: { winnings: newWinnings } });
            }
          }, 1000);
        } else {
          setMessage("❌ Sorry, that's incorrect. Game Over!");
          setShowMessage(true);
      
          setTimeout(() => {
            navigate("/result", { state: { winnings: winnings } });
          }, 1000);
        }
      };
      
    
  return (
    <div className='quiz-main-layout'>
        <div className="quiz-section">
            <h2>Question {currentIndex + 1} / {questions.length}</h2>
            <h3>Current Winnings: ${winnings}</h3>
            {showMessage ? (
            <div className="feedback-message">{message}</div>
            ) : (
            <QuestionCard
                question={questions[currentIndex].question}
                options={questions[currentIndex].options}
                onAnswer={handleAnswer}
            />
            )}
        </div>
    </div>
  );
}

export default Quiz;
