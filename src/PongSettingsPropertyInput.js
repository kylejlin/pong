import React from 'react';

function PongSettingsPropertyInput({
  description,
  property,
  value,
  unit,
  handleSettingChange
}) {
  return (
    <tr>
      <td>{description}</td>
      <td>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            handleSettingChange(property, e.target.value);
          }}
        />
      </td>
      <td>{unit}</td>
    </tr>
  );
}

export default PongSettingsPropertyInput;
