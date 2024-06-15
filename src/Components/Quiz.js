import React, { useState, useEffect } from 'react';
import './Quiz.css';
import Score from './Score';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const storedCurrentQuestion = localStorage.getItem('currentQuestion');
    const storedScore = localStorage.getItem('score');
    const storedTimeLeft = localStorage.getItem('timeLeft');

    if (storedCurrentQuestion && storedScore && storedTimeLeft) {
      setCurrentQuestion(parseInt(storedCurrentQuestion));
      setScore(parseInt(storedScore));
      setTimeLeft(parseInt(storedTimeLeft));
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          localStorage.setItem('timeLeft', prev - 1);
          return prev - 1;
        } else {
          clearInterval(timer);
          handleQuizSubmit(); // Auto-submit quiz when time runs out
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentQuestion', currentQuestion);
    localStorage.setItem('score', score);
  }, [currentQuestion, score]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption('');
    }
  };

  const handleQuizSubmit = () => {
    setQuizFinished(true);
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('score');
    localStorage.removeItem('timeLeft');
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
    setQuizStarted(false);
    setTimeLeft(600);
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('score');
    localStorage.removeItem('timeLeft');
  };

  if (quizFinished) {
    return <Score score={score} totalQuestions={questions.length} onRetry={handleRetry} />;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-timer">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</div>
      <div className="quiz-box">
        <div className="quiz-question">
          <h2>{`${currentQuestion + 1}. ${questions[currentQuestion].question}`}</h2>
        </div>
        <div className="quiz-options">
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleOptionClick(option)} className={selectedOption === option ? 'selected' : ''}>
              {option}
            </button>
          ))}
        </div>
        <div className="quiz-controls">
          <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>Previous</button>
          <button onClick={handleNextQuestion} disabled={!selectedOption}>
            {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
