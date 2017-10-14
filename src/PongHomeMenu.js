import React from 'react';
import PongButton from './PongButton';
import './PongHomeMenu.css';

function PongHomeMenu({ onStartButtonClicked, onSettingsButtonClicked }) {
  return (
    <div className="PongHomeMenu">
      <img src="homescreen-logo.svg" alt="Pong" className="PongHomeMenu-logo" />

      <PongButton onClick={onStartButtonClicked}>
        Play
      </PongButton>

      <PongButton onClick={onSettingsButtonClicked}>
        Settings
      </PongButton>
    </div>
  );
}

export default PongHomeMenu;
