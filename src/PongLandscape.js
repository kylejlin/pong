import React, { Component } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import ScoreBoard from './ScoreBoard';
import './PongLandscape.css';

class PongLandscape extends Component {
  constructor(props) {
    super(props);

    this.PADDLE_HEIGHT = props.height / 7;
    this.PADDLE_WIDTH = (3 / 13) * this.PADDLE_HEIGHT;
    this.BALL_RADIUS = this.PADDLE_HEIGHT / 5;
    this.BALL_COLOR = '#f4c20d ';

    this.state = {
      scores: [0, 0],

      paddle0: {
        x: this.PADDLE_WIDTH,
        y: (window.innerHeight - this.PADDLE_HEIGHT) / 2,
        color: '#db3236'
      },

      paddle1: {
        x: props.width - (2 * this.PADDLE_WIDTH),
        y: (props.height - this.PADDLE_HEIGHT) / 2,
        color: '#3cba54'
      },

      ball: {
        x: (props.width / 2) - this.BALL_RADIUS,
        y: (props.height / 2) - this.BALL_RADIUS
      }
    };

    window.addEventListener('touchmove', ({ changedTouches }) => {
      const paddle0 = {
        ...this.state.paddle0
      };
      const paddle1 = {
        ...this.state.paddle1
      };

      for (let touch of changedTouches) {
        if (touch.clientX < (props.width / 2)) {
          paddle0.y = touch.clientY - (this.PADDLE_HEIGHT / 2);
        } else {
          paddle1.y = touch.clientY - (this.PADDLE_HEIGHT / 2);
        }
      }
    });
  }

  render() {
    return (
      <div className="PongLandscape">
        <Paddle
          x={this.state.paddle0.x}
          y={this.state.paddle0.y}
          width={this.PADDLE_WIDTH}
          height={this.PADDLE_HEIGHT}
          color={this.state.paddle0.color}
        />

        <Paddle
          x={this.state.paddle1.x}
          y={this.state.paddle1.y}
          width={this.PADDLE_WIDTH}
          height={this.PADDLE_HEIGHT}
          color={this.state.paddle1.color}
        />

        <Ball
          x={this.state.ball.x}
          y={this.state.ball.y}
          radius={this.BALL_RADIUS}
          color={this.BALL_COLOR}
        />

        <ScoreBoard scores={this.state.scores} />
      </div>
    );
  }
}

export default PongLandscape;
