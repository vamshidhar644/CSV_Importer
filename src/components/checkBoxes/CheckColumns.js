import React from 'react';
import './Checkbox.css';

const CheckColumns = ({ csvData, selectedColumns, toggleColumnSelection }) => {
  return (
    <div className="column__selection">
      <h2>Select Columns to Import</h2>
      <ul>
        {Object.keys(csvData[0] || {}).map((columnName) => (
          <li
            key={columnName}
            className={selectedColumns.includes(columnName) ? 'checked' : ''}
          >
            <label className="container">
              <input
                type="checkbox"
                checked={selectedColumns.includes(columnName)}
                onChange={() => toggleColumnSelection(columnName)}
              />
              <div className="checkmark"></div>
              {columnName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckColumns;
