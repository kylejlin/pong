import React from 'react';

function PongSettingsPropertyInput({
  description,
  property,
  value,
  unit,
  handlePropertyInputValueChange,
  handleFinishedSettingChange
}) {
  return (
    <tr>
      <td>{description}</td>
      <td>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            handlePropertyInputValueChange(property, e.target.value);
          }}
          onBlur={(e) => {
            handleFinishedSettingChange(property, e.target.value);
          }}
        />
      </td>
      <td>{unit}</td>
    </tr>
  );
}

export default PongSettingsPropertyInput;
