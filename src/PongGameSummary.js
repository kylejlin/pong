import React from 'react';
import ScoreBoard from './ScoreBoard';
import PongButton from './PongButton';
import './PongGameSummary.css';

function PongGameSummary({ scores, timeLeft, onHomeClicked, onContinueClicked }) {
  if (timeLeft > 0) {
    return (
      <div className="PongGameSummary">
        <div className="PongGameSummary-title">Paused</div>
        <ScoreBoard scores={scores} timeLeft={timeLeft} />
        <PongButton onClick={onContinueClicked} fontSize="40px">Continue</PongButton>
        <PongButton onClick={onHomeClicked} fontSize="40px">Home</PongButton>
      </div>
    );
  } else {
    return (
      <div className="PongGameSummary">
        <div className="PongGameSummary-title">Final:</div>
        <ScoreBoard scores={scores} />
        <PongButton onClick={onHomeClicked}>Home</PongButton>
      </div>
    );
  }
}

export default PongGameSummary;
