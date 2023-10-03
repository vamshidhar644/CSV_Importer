import { useState } from 'react';
import Papa from 'papaparse';
import pako from 'pako';

const ImportCSV = () => {
  const [csvData, setCsvData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Read the CSV file
    const reader = new FileReader();

    reader.onload = async (event) => {
      const csvText = event.target.result;

      // Compress the CSV data
      const compressedCsv = pako.deflate(csvText, { to: 'string' });

      // Chunk the compressed data into smaller parts (e.g., 1MB chunks)
      const chunkSize = 1024 * 1024 * 15; // 5MB
      const totalChunks = Math.ceil(compressedCsv.length / chunkSize);
      const chunks = [];
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = (i + 1) * chunkSize;
        const chunk = compressedCsv.slice(start, end);
        chunks.push(chunk);
      }

      // Simulate uploading chunks (replace this with your actual upload logic)
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        await simulateUploadChunk(chunk, i, totalChunks);
      }

      // Parse the CSV data using PapaParse
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (result) => {
          // Handle the parsed data here
          setCsvData(result.data);

          // Initialize selectedColumns with all available columns
          setSelectedColumns(Object.keys(result.data[0] || {}));
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
        },
      });
    };
    // setFilteredData(csvData);
    reader.readAsText(file);
  };

  // Simulated chunk upload function (replace this with your actual upload logic)
  const simulateUploadChunk = async (chunk, currentChunk, totalChunks) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Uploaded chunk ${currentChunk + 1} of ${totalChunks}`);
        resolve();
      }, 1000); // Simulated delay, replace with actual upload logic
    });
  };

  const toggleColumnSelection = (columnName) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
    }
  };

  return { onDrop, toggleColumnSelection, csvData, selectedColumns };
};

export default ImportCSV;
