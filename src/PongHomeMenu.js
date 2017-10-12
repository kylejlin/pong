import React from 'react';
import PongButton from './PongButton';
import './PongHomeMenu.css';

function PongHomeMenu({ onStartButtonClicked }) {
  return (
    <div className="PongHomeMenu">
      <div className="PongHomeMenu-title">
        <span className="PongHomeMenu-title-P">P</span>
        <span className="PongHomeMenu-title-o">o</span>
        <span className="PongHomeMenu-title-n">n</span>
        <span className="PongHomeMenu-title-g">g</span>
      </div>

      <PongButton onClick={onStartButtonClicked}>
        Play
      </PongButton>
    </div>
  );
}

export default PongHomeMenu;
