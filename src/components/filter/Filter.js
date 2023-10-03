/* eslint-disable use-isnan */
import React, { useEffect, useState } from 'react';
import './Filter.css';
import FilterData from '../../helpers/FilterData';

const Filter = ({ csvData, selectedColumns, handleFilter }) => {
  const { dataFiltering, filteredData } = FilterData();

  const [selectedColumn, setSelectedColumn] = useState('');
  const [filterType, setFilterType] = useState('range');
  const [filterValue, setFilterValue] = useState('');

  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  useEffect(() => {
    dataFiltering(selectedColumn, csvData, filterType, from, to, filterValue);
  }, [filterValue, from, to]);

  useEffect(() => {
    if (filterValue === '' && from === '' && to === '') {
      handleFilter(csvData);
    } else {
      handleFilter(filteredData ? filteredData : false);
    }
  }, [filteredData, filterValue, from, to]);

  return (
    <div className="filter__container">
      <div className="select__button">
        <button className="button">
          {selectedColumn ? selectedColumn : 'Select Column to filter'}
        </button>
        <div className="dropdown-content">
          {selectedColumns.map((column, i) => (
            <p id="top" key={i} onClick={() => setSelectedColumn(column)}>
              {column}
            </p>
          ))}
        </div>
      </div>

      <div className="select__button">
        <button className="button">
          {filterType ? filterType : 'Select type to filter'}
        </button>
        <div className="dropdown-content">
          <p onClick={() => setFilterType('range')}>Filter by Range</p>
          <p onClick={() => setFilterType('value')}>Filter by Value</p>
        </div>
      </div>
      {filterType === 'value' ? (
        <input type="text" onChange={(e) => setFilterValue(e.target.value)} />
      ) : (
        <>
          <input
            type="number"
            placeholder="from"
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="number"
            placeholder="to"
            onChange={(e) => setTo(e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default Filter;
