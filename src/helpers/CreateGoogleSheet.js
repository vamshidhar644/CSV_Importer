import { useState } from 'react';
import { gapi } from 'gapi-script';

const CreateGoogleSheet = () => {
  const [googleSheetId, setGoogleSheetId] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;
  const clientId = process.env.REACT_APP_CLIENT_ID;

  const createGSheet = (selectedColumns, csvData) => {
    gapi.load('client', () => {
      gapi.client
        .init({
          apiKey: apiKey,
          clientId: clientId,
          discoveryDocs: [
            'https://sheets.googleapis.com/$discovery/rest?version=v4',
          ],
          scope: 'https://www.googleapis.com/auth/spreadsheets',
        })
        .then(() => {
          // Authentication and API initialization successful
          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
              gapi.client.sheets.spreadsheets
                .create({
                  properties: {
                    title: 'My Imported CSV Data', // Replace with your desired title
                  },
                })
                .then((response) => {
                  const spreadsheetId = response.result.spreadsheetId;
                  setGoogleSheetId(spreadsheetId);

                  const headerRow = selectedColumns;
                  const dataRows = csvData.map((row) =>
                    selectedColumns.map((columnName) => row[columnName])
                  );

                  // Combine the header row and data rows
                  const values = [headerRow, ...dataRows];

                  gapi.client.sheets.spreadsheets.values
                    .update({
                      spreadsheetId,
                      range: 'A1', // Update this to specify the cell range where you want to insert data
                      valueInputOption: 'RAW',
                      resource: {
                        values,
                      },
                    })
                    .then(() => {
                      console.log('CSV data imported successfully.');
                    });
                });
            });
        })
        .catch((error) => {
          console.error('Error initializing Google API client:', error);
        });
    });
  };

  return { createGSheet, googleSheetId };
};

export default CreateGoogleSheet;
