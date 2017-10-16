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
        <PongButton onClick={onContinueClicked} extraClassNames="PongButton-medium">Continue</PongButton>
        <PongButton onClick={onHomeClicked} extraClassNames="PongButton-medium">Home</PongButton>
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
