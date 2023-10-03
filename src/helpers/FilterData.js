import { useState } from 'react';

const FilterData = () => {
  const [filteredData, setFilteredData] = useState([]);

  const dataFiltering = (
    selectedColumn,
    csvData,
    filterType,
    from,
    to,
    filterValue
  ) => {
    if (selectedColumn) {
      const filtered = csvData.filter((row) => {
        const cellValue = row[selectedColumn];

        if (filterType === 'range') {
          const minValue = parseInt(from);
          const maxValue = parseInt(to);

          return cellValue >= minValue && cellValue <= maxValue;
        } else if (typeof cellValue === 'string' && filterType === 'value') {
          return cellValue.includes(filterValue);
        }
        return false;
      });
      setFilteredData(filtered);
    }
  };

  return { dataFiltering, filteredData };
};

export default FilterData;
