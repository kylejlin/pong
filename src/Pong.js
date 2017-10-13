import React, { Component } from 'react';
import ActivePongGame from './ActivePongGame';
import PongHomeMenu from './PongHomeMenu';
import PongGameSummary from './PongGameSummary';

class Pong extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      isPaused: false,
      hasEnded: false,
      orientation: this.getOrientation()
    };

    this.executeDueTicks = this.executeDueTicks.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);

    this.config = this.loadConfig() || {
      STARTING_SPEED_MIN_COEFFICIENT: 0.01,
      STARTING_SPEED_MAX_COEFFICIENT: 0.02,
      ACCELERATION_COEFFICIENT: 0.002,
      GAME_DURATION: 1.5e4
    };

    window.addEventListener('resize', () => {
      this.setState({
        orientation: this.getOrientation()
      });
    });

    window.addEventListener('touchmove', ({ changedTouches }) => {
      if (this.state.isRunning) {
        changedTouches = Array.from(changedTouches);

        const paddle0 = {
          ...this.state.paddle0
        };
        const paddle1 = {
          ...this.state.paddle1
        };

        for (let touch of changedTouches) {
          if (touch.clientX < (this.state.screen.WIDTH / 2)) {
            paddle0.y = this.state.screen.HEIGHT - touch.clientY - (this.state.paddle0.HEIGHT / 2);
          } else {
            paddle1.y = this.state.screen.HEIGHT - touch.clientY - (this.state.paddle1.HEIGHT / 2);
          }
        }

        this.setState({ paddle0, paddle1 });
      }
    });

    document.body.addEventListener('touchstart', (e) => {
      if (this.state.isRunning &&
        e.target.className.indexOf('PongButton') === -1
      ) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  render() {
    if (this.state.isRunning) {
      return <ActivePongGame
        orientation={this.state.orientation}
        objects={this.state}
        onPauseClicked={this.pause}
      />;
    } else if (this.state.isPaused || this.state.hasEnded) {
      return (
        <PongGameSummary
          scores={this.state.scores}
          timeLeft={this.state.timeLeft}
          onHomeClicked={() => {
            this.setState({
              isRunning: false,
              isPaused: false,
              hasEnded: false
            });
          }}
          onContinueClicked={() => {
            this.setState({
              isRunning: true,
              isPaused: false
            });

            this.timeLastUpdated = Date.now();

            window.requestAnimationFrame(this.executeDueTicks);
          }}
        />
      );
    } else {
      return <PongHomeMenu onStartButtonClicked={this.start} />;
    }
  }

  start() {
    const PADDLE_HEIGHT = window.innerHeight / 7;
    const PADDLE_WIDTH = (3 / 13) * PADDLE_HEIGHT;
    const BALL_RADIUS = PADDLE_HEIGHT / 5;

    this.setState({
      screen: {
        WIDTH: window.innerWidth,
        HEIGHT: window.innerHeight
      }
    });

    this.setState({
      scores: [0, 0],

      paddle0: {
        x: PADDLE_WIDTH,
        y: (window.innerHeight - PADDLE_HEIGHT) / 2,
        WIDTH: PADDLE_WIDTH,
        HEIGHT: PADDLE_HEIGHT,
        COLOR: '#db3236'
      },

      paddle1: {
        x: window.innerWidth - (2 * PADDLE_WIDTH),
        y: (window.innerHeight - PADDLE_HEIGHT) / 2,
        WIDTH: PADDLE_WIDTH,
        HEIGHT: PADDLE_HEIGHT,
        COLOR: '#3cba54'
      },

      ball: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        dx: this.getRandomBallSpeed_(window.innerWidth),
        dy: this.getRandomBallSpeed_(window.innerWidth),
        RADIUS: BALL_RADIUS,
        COLOR: '#f4c20d'
      },

      screen: {
        WIDTH: window.innerWidth,
        HEIGHT: window.innerHeight
      },

      timeLeft: this.config.GAME_DURATION,

      isRunning: true,

      isPaused: false,

      hasEnded: false
    });

    this.timeLastUpdated = Date.now();
    this.tickTime = 40;

    window.requestAnimationFrame(this.executeDueTicks);
  }

  calculateAndUpdateBallPosition_(newState) {
    const { ball, paddle0, paddle1 } = newState;

    ball.x += ball.dx;
    ball.y += ball.dy;

    const acclerateUnlessLimitIsReached = () => {
      if (ball.dx < (newState.screen.WIDTH / 2) &&
      ball.dy < (newState.screen.HEIGHT / 2)) {
        const ACCELERATION = newState.screen.WIDTH *
          this.config.ACCELERATION_COEFFICIENT;

        ball.dx += ball.dx > 0 ? ACCELERATION : -ACCELERATION;
        ball.dy += ball.dy > 0 ? ACCELERATION : -ACCELERATION;
      }
    };

    if (this.isBallTouchingPaddle_(ball, paddle0)) {
      ball.x = (2 * (paddle0.x + paddle0.WIDTH + ball.RADIUS)) - ball.x;
      ball.dx = -ball.dx;
      acclerateUnlessLimitIsReached();
    } else if (this.isBallTouchingPaddle_(ball, paddle1)) {
      ball.x = (2 * (paddle1.x - ball.RADIUS)) - ball.x;
      ball.dx = -ball.dx;
      acclerateUnlessLimitIsReached();
    }

    if (ball.y < ball.RADIUS) {
      ball.y = (2 * ball.RADIUS) - ball.y;
      ball.dy = -ball.dy;
    } else if (ball.y > (newState.screen.HEIGHT - ball.RADIUS)) {
      ball.y = (2 * (newState.screen.HEIGHT - ball.RADIUS)) - ball.y;
      ball.dy = -ball.dy;
    }
  }

  calculatePointsAwarded_(newState) {
    return ~~(10 * (2 - (newState.timeLeft / this.config.GAME_DURATION)));
  }

  executeDueTicks() {
    let ticksDue = Math.floor((Date.now() - this.timeLastUpdated) / this.tickTime);

    while (ticksDue--) {
      if (this.state.isRunning) {
        this.tick();
        this.timeLastUpdated += this.tickTime;
      }
    }

    if (this.state.isRunning) {
      window.requestAnimationFrame(this.executeDueTicks);
    }
  }

  getOrientation() {
    return window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait';
  }

  getRandomBallSpeed_(width) {
    const min = width * this.config.STARTING_SPEED_MIN_COEFFICIENT;
    const max = width * this.config.STARTING_SPEED_MAX_COEFFICIENT;

    const abs = min + (Math.random() * (max - min));

    return Math.random() > 0.5 ? abs : -abs;
  }

  isBallTouchingPaddle_(ball, paddle) {
    const slope = ball.dy / ball.dx;
    const yIntercept = ball.y - (slope * ball.x);

    if (
      ball.x < (paddle.x + paddle.WIDTH + ball.RADIUS) &&
      ball.x > (paddle.x - ball.RADIUS)
    ) {
      const corners = [
        [paddle.x, paddle.y],
        [paddle.x + paddle.WIDTH, paddle.y],
        [paddle.x + paddle.WIDTH, paddle.y + paddle.HEIGHT],
        [paddle.x, paddle.y + paddle.HEIGHT]
      ];

      const isCornerAboveLine = ([cornerX, cornerY]) => {
        return cornerY > ((slope * cornerX) + yIntercept);
      };

      const cornersAboveLine = corners.filter(isCornerAboveLine);

      return (cornersAboveLine.length !== 0) && (cornersAboveLine.length !== 4);
    } else {
      return false;
    }
  }

  loadConfig() {
    try {
      const configStr = window.localStorage.getItem('pong-settings');
      if (!configStr) {
        return null;
      } else {
        const configJSON = JSON.parse(configStr);
        if (!(
          'STARTING_SPEED_MIN_COEFFICIENT' in configJSON &&
          'STARTING_SPEED_MAX_COEFFICIENT' in configJSON &&
          'ACCELERATION_COEFFICIENT' in configJSON &&
          'GAME_DURATION' in configJSON
        )) {
          return null;
        } else {
          return configJSON;
        }
      }
    } catch (e) {
      return null;
    }
  }

  pause() {
    this.setState({
      isRunning: false,
      isPaused: true
    });
  }

  resetBallAfterGoal_(newState) {
    newState.ball.x = newState.screen.WIDTH / 2;
    newState.ball.y = newState.screen.HEIGHT / 2;
    newState.ball.dx = this.getRandomBallSpeed_(newState.screen.WIDTH);
    newState.ball.dy = this.getRandomBallSpeed_(newState.screen.WIDTH);
  }

  tick() {
    const newState = { ...this.state };

    this.calculateAndUpdateBallPosition_(newState);

    if (newState.ball.x < 0) {
      newState.scores[1] += this.calculatePointsAwarded_(newState);
      this.resetBallAfterGoal_(newState);
    } else if (newState.ball.x > this.state.screen.WIDTH) {
      newState.scores[0] += this.calculatePointsAwarded_(newState);
      this.resetBallAfterGoal_(newState);
    }

    newState.timeLeft -= this.tickTime;

    if (newState.timeLeft <= 0) {
      newState.isRunning = false;
      newState.hasEnded = true;
    }
    this.setState(newState);
  }
}

export default Pong;
