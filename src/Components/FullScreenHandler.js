import React from 'react';
import './FullScreenHandler.css';

const FullScreenHandler = ({ onRequestFullScreen }) => {
  return (
    <div className="fullscreen-handler">
      <div className="content">
        <h1>Welcome to Quiz</h1>
        <p>Please enable full-screen mode </p>
        <button onClick={onRequestFullScreen}>Enable Full-Screen</button>
      </div>
    </div>
  );
};

export default FullScreenHandler;
