import React, { useState, useEffect, useRef } from 'react';
import Quiz from './Components/Quiz';
import FullScreenHandler from './Components/FullScreenHandler';
import questions from './Components/questions.json';



const TOTAL_TIME = 600; // 10 minutes in seconds

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(
    parseInt(localStorage.getItem('currentQuestion')) || 0
  );
  const [timeLeft, setTimeLeft] = useState(
    parseInt(localStorage.getItem('timeLeft')) || TOTAL_TIME
  );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [score, setScore] = useState(parseInt(localStorage.getItem('score')) || 0);

  const timerRef = useRef();

  useEffect(() => {
    if (timeLeft <= 0) {
      alert('Time is up!');
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem('currentQuestion', currentQuestion);
    localStorage.setItem('timeLeft', timeLeft);
    localStorage.setItem('score', score);
  }, [currentQuestion, timeLeft, score]);

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement != null);
  };

  const handleFullScreenRequest = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <div className="App">
      {!isFullScreen && <FullScreenHandler onRequestFullScreen={handleFullScreenRequest} />}
      {isFullScreen && (
        <Quiz
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          timeLeft={timeLeft}
          score={score}
          setScore={setScore}
        />
      )}
    </div>
  );
}

export default App;