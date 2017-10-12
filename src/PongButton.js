import React from 'react';
import Prefixer from 'inline-style-prefixer';
import './PongButton.css';

const prefixer = new Prefixer();

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

  const prefixedStyle = prefixer.prefix(style);

  return (
    <div
      className="PongButton"
      onClick={onClick}
      style={prefixedStyle}
    >{children}</div>
  );
}

export default PongButton;
