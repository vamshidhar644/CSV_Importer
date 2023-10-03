import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import DisplayTable from './components/table/DisplayTable';
import CheckColumns from './components/checkBoxes/CheckColumns';
import Filter from './components/filter/Filter';
import ImportCSV from './helpers/ImportCSV';

const CSVImporter = () => {
  const { onDrop, csvData, selectedColumns, toggleColumnSelection } =
    ImportCSV();

  const [filteredData, setFilteredData] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.csv',
  });

  const handleFilter = (data) => {
    if (data) {
      setFilteredData(data);
    }
  };

  return (
    <div>
      <div {...getRootProps()} className="dropZone">
        <input {...getInputProps()} />
        <p>Drag & drop a CSV file here</p>
      </div>

      {csvData && csvData.length > 0 && (
        <CheckColumns
          csvData={csvData}
          selectedColumns={selectedColumns}
          toggleColumnSelection={toggleColumnSelection}
        />
      )}

      {csvData && csvData.length > 0 && (
        <Filter
          csvData={csvData}
          selectedColumns={selectedColumns}
          handleFilter={handleFilter}
        />
      )}

      {csvData && csvData.length > 0 ? (
        <DisplayTable
          selectedColumns={selectedColumns}
          csvData={filteredData.length > 0 ? filteredData : csvData}
          toggleColumnSelection={toggleColumnSelection}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default CSVImporter;
