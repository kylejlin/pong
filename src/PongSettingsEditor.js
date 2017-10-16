import React from 'react';
import PongSettingsPropertyInput from './PongSettingsPropertyInput';
import PongButton from './PongButton';
import './PongSettingsEditor.css';

function PongSettingsEditor({ handlePropertyInputValueChange, handleFinishedSettingChange, values, onHomeClicked }) {
  return (
    <div className="PongSettingsEditor">
      {/*<table className="PongSettingsEditor-header-table">
        <tbody>
          <tr>
            <td>
              <PongButton
                onClick={onHomeClicked}
                extraClassNames="PongButton-align-left PongButton-medium"
              >
                Home
              </PongButton>
            </td>

            <td><div className="PongSettingsEditor-title">Settings</div></td>
          </tr>
        </tbody>
      </table>*/}

      <div className="PongSettingsEditor-header">
        <PongButton
          onClick={onHomeClicked}
          extraClassNames="PongButton-back PongButton-medium"
        >
          Home
        </PongButton>

        <div className="PongSettingsEditor-title">Settings</div>
      </div>

      <table className="PongSettingsEditor-settings-table">
        <tbody>
          <tr className="PongSettingsEditor-column-title">
            <td>Property</td>
            <td>Value</td>
            <td>Unit</td>
          </tr>

          <PongSettingsPropertyInput
            description="Game duration"
            property="GAME_DURATION"
            value={values.GAME_DURATION}
            unit="milliseconds"
            handlePropertyInputValueChange={handlePropertyInputValueChange}
            handleFinishedSettingChange={handleFinishedSettingChange}
          />

          <PongSettingsPropertyInput
            description="Minimum initial ball speed"
            property="STARTING_SPEED_MIN_COEFFICIENT"
            value={values.STARTING_SPEED_MIN_COEFFICIENT}
            unit="multiplier of screen width"
            handlePropertyInputValueChange={handlePropertyInputValueChange}
            handleFinishedSettingChange={handleFinishedSettingChange}
          />

          <PongSettingsPropertyInput
            description="Maximum initial ball speed"
            property="STARTING_SPEED_MAX_COEFFICIENT"
            value={values.STARTING_SPEED_MAX_COEFFICIENT}
            unit="multiplier of screen width"
            handlePropertyInputValueChange={handlePropertyInputValueChange}
            handleFinishedSettingChange={handleFinishedSettingChange}
          />

          <PongSettingsPropertyInput
            description="Acceleration when ball hits paddle"
            property="ACCELERATION_COEFFICIENT"
            value={values.ACCELERATION_COEFFICIENT}
            unit="multiplier of screen width"
            handlePropertyInputValueChange={handlePropertyInputValueChange}
            handleFinishedSettingChange={handleFinishedSettingChange}
          />
        </tbody>
      </table>
    </div>
  );
}

export default PongSettingsEditor;
