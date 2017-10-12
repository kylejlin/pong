import React from 'react';
import PongButton from './PongButton';
import './PongHomeMenu.css';

function PongHomeMenu({ onStartButtonClicked }) {
  return (
    <div className="PongHomeMenu">
      <img src="homescreen-logo.svg" alt="Pong" className="PongHomeMenu-logo" />

      <PongButton onClick={onStartButtonClicked}>
        Play
      </PongButton>
    </div>
  );
}

export default PongHomeMenu;
