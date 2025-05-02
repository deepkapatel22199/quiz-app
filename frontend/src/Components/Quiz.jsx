import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import Ladder from "./Ladder";
import "./Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [winnings, setWinnings] = useState(0);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Lifeline states
  const [lifelineUsed, setLifelineUsed] = useState({ fiftyFifty: false, skip: false });

  const navigate = useNavigate();

  const prizeMoney = [
    0, 100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000,
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=15&category=9&difficulty=medium&type=multiple"
        );
        const data = await res.json();
        const formatted = data.results.map((q) => ({
          question: decodeHTML(q.question),
          options: shuffle([q.correct_answer, ...q.incorrect_answers]),
          correctAnswer: decodeHTML(q.correct_answer),
        }));
        setQuestions(formatted);
      } catch (err) {
        console.error("Error loading questions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const decodeHTML = (text) => {
    const parser = new DOMParser();
    return parser.parseFromString(text, "text/html").body.textContent;
  };

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const handleAnswer = (selected) => {
    if (locked) return;
    setLocked(true);
    const correct = questions[currentQIndex].correctAnswer;

    setTimeout(() => {
      if (selected === correct) {
        setFeedback("correct");
        const newWinnings = prizeMoney[currentQIndex + 1];
        setWinnings(newWinnings);
        speakMessage("Congratulations! You won this round!");

        setTimeout(() => {
          setFeedback(null);
          if (currentQIndex + 1 < questions.length) {
            setCurrentQIndex((prev) => prev + 1);
          } else {
            navigate("/result", { state: { winnings: newWinnings } });
          }
          setLocked(false);
        }, 1500);
      } else {
        setFeedback("wrong");
        speakMessage("Sorry, wrong answer!");

        setTimeout(() => {
          setFeedback(null);
          navigate("/result", { state: { winnings } });
        }, 1500);
      }
    }, 1000);
  };

  const speakMessage = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const useFiftyFifty = () => {
    if (lifelineUsed.fiftyFifty) return;

    const currentQuestion = questions[currentQIndex];
    const incorrectOptions = currentQuestion.options.filter(
      (opt) => opt !== currentQuestion.correctAnswer
    );

    const optionsToRemove = shuffle(incorrectOptions).slice(0, 2);
    const updatedOptions = currentQuestion.options.filter(
      (opt) => !optionsToRemove.includes(opt)
    );

    const updatedQuestions = [...questions];
    updatedQuestions[currentQIndex] = {
      ...currentQuestion,
      options: updatedOptions,
    };

    setQuestions(updatedQuestions);
    setLifelineUsed((prev) => ({ ...prev, fiftyFifty: true }));
  };

  const skipQuestion = () => {
    if (lifelineUsed.skip) return;
    setLocked(true);
    setTimeout(() => {
      setCurrentQIndex((prev) => prev + 1);
      setLifelineUsed((prev) => ({ ...prev, skip: true }));
      setLocked(false);
    }, 1000);
  };

  if (loading) return <div className="quiz-loading">Loading...</div>;

  return (
    <div className="quiz-container">
      <div className="quiz-left">
        <QuestionCard
          question={questions[currentQIndex]}
          onAnswer={handleAnswer}
          locked={locked}
        />
      </div>
      <div className="quiz-right">
        <Ladder current={currentQIndex + 1} prizeMoney={prizeMoney} />
      </div>

      {feedback && (
        <div className={`feedback-modal ${feedback}`}>
          {feedback === "correct"
            ? "🎉 Congratulations! You won this round!"
            : "❌ Sorry, wrong answer!"}
        </div>
      )}

      {/* Lifeline buttons */}
      <div className="lifeline-buttons">
        <button
          className="lifeline-btn"
          onClick={useFiftyFifty}
          disabled={lifelineUsed.fiftyFifty}
        >
          50:50
        </button>
        <button
          className="lifeline-btn"
          onClick={skipQuestion}
          disabled={lifelineUsed.skip}
        >
          Skip Question
        </button>
      </div>
    </div>
  );
};

export default Quiz;
