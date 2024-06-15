import React from 'react';
import './Score.css';

const Score = ({ score, totalQuestions, onRetry }) => {
  const calculateFeedback = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) {
      return "Excellent! Keep up the good work.";
    } else if (percentage >= 60) {
      return "Good job! You're on the right track.";
    } else if (percentage >= 40) {
      return "Not bad. Keep practicing to improve.";
    } else {
      return "You can do better. Review your answers and try again.";
    }
  };

  return (
    <div className="score-container">
      <div className="thankyou-box">
        <h2>Thank you for submission</h2>
      </div>
      <div className="score-box">
        <div className="score-title">Quiz Score</div>
        <div className="score-result">Your score: {score} out of {totalQuestions}</div>
        <div className="feedback">{calculateFeedback()}</div>
        <div className="score-controls">
          <button onClick={onRetry}>Retry Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default Score;
