import React from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import ScoreBoard from './ScoreBoard';
import PongButton from './PongButton';
import './ActivePongGame.css';

function ActivePongGame({
  orientation,
  objects,
  onPauseClicked
}) {
  if (orientation === 'landscape') {
    return (
      <div className="ActivePongGame">
        <ScoreBoard
          scores={objects.scores}
          timeLeft={objects.timeLeft}
        />

        <Paddle
          x={objects.paddle0.x}
          y={objects.paddle0.y}
          width={objects.paddle0.WIDTH}
          height={objects.paddle0.HEIGHT}
          color={objects.paddle0.COLOR}
        />

        <Paddle
          x={objects.paddle1.x}
          y={objects.paddle1.y}
          width={objects.paddle1.WIDTH}
          height={objects.paddle1.HEIGHT}
          color={objects.paddle1.COLOR}
        />

        <Ball
          x={objects.ball.x}
          y={objects.ball.y}
          radius={objects.ball.RADIUS}
          color={objects.ball.COLOR}
        />

        <PongButton
          onClick={onPauseClicked}
          extraClassNames="PongButton-small PongButton-align-bottom"
        >
          Pause
        </PongButton>
      </div>
    );
  } else {
    return (
      <div>Sorry, portrait mode is not supported yet.</div>
    );
  }
}

export default ActivePongGame;
