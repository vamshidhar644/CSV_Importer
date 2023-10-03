import React from 'react';

import CreateGoogleSheet from '../../helpers/CreateGoogleSheet';

const DisplayTable = ({ selectedColumns, csvData }) => {
  const { createGSheet, googleSheetId } = CreateGoogleSheet();

  const createGoogleSheet = () => {
    createGSheet(selectedColumns, csvData);
  };

  if (!csvData) {
    return;
  } else {
    return (
      <div className="table__container">
        <h2>CSV Data</h2>
        <div className="import__csv">
          {csvData && selectedColumns.length > 0 && (
            <button onClick={createGoogleSheet}>Create Google Sheet</button>
          )}
          {googleSheetId && (
            <p>
              Google Sheet created click on this{' '}
              <a
                href={`https://docs.google.com/spreadsheets/d/${googleSheetId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link{' '}
              </a>
            </p>
          )}
        </div>
        <table>
          <thead>
            <tr>
              {selectedColumns.map((columnName) => (
                <th key={columnName}>{columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                {selectedColumns.map((columnName) => (
                  <td key={columnName}>{row[columnName]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default DisplayTable;
