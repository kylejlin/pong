import React from 'react';
import './Paddle.css';

function Paddle(props) {
  return (
    <div
      className="Paddle"
      style={{
        left: props.x + 'px',
        bottom: props.y + 'px',
        width: props.width + 'px',
        height: props.height + 'px',
        backgroundColor: props.color
      }}
    >
    </div>
  );
}

export default Paddle;
