import React from 'react';
import beautifyTime from './beautifyTime';
import './ScoreBoard.css';

function ScoreBoard({ scores, timeLeft }) {
  return (
    <div className="ScoreBoard">
      <div className="ScoreBoard-score">
        {scores.join(' | ')}
      </div>

      {
        'number' === typeof timeLeft ?
          (
            <div className="ScoreBoard-time">
              {beautifyTime(timeLeft)}
            </div>
          )
          : ''
      }
    </div>
  );
}

export default ScoreBoard;
