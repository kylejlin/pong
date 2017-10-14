import React from 'react';
import './PongButton.css';

function PongButton({ onClick, children, extraClassNames }) {
  extraClassNames = 'string' === typeof extraClassNames ? extraClassNames : '';

  if (extraClassNames !== '') {
    extraClassNames = ' ' + extraClassNames;
  }

  return (
    <div
      className={"PongButton" + extraClassNames}
      onClick={onClick}
    >{children}</div>
  );
}

export default PongButton;
