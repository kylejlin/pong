import React from 'react';
import './PongButton.css';

function PongButton({ onClick, children, icon, width, fontSize, align }) {
  const style = {
    width: width ? width : 'min-content',
    fontSize: fontSize ? fontSize : '60px'
  };

  if (align === 'bottom') {
    style.position = 'absolute';
    style.bottom = '0px';
    style.left = '50%';
    style.transform = 'translate(-50%)';
  }

  return (
    <div
      className="PongButton"
      onClick={onClick}
      style={style}
    >{children}</div>
  );
}

export default PongButton;
