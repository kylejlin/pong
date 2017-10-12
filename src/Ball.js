import React from 'react';
import './Ball.css';

function Ball(props) {
  return (
    <div
      className="Ball"
      style={{
        left: props.x + 'px',
        bottom: props.y + 'px',
        width: (props.radius * 2) + 'px',
        height: (props.radius * 2) + 'px',
        borderRadius: props.radius,
        backgroundColor: props.color
      }}
    >
    </div>
  );
}

export default Ball;
