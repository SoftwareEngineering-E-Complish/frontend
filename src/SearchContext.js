import React, { createContext, useContext, useState } from 'react';
import axiosInstance from './api/axiosInstance';
import mapFormValuesToQueryParams from './components/helpers/mapFormValuesToQueryParams';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  const [formValues, setFormValues] = useState({
    priceMin: 0,
    priceMax: 10000000,
    bedroomMin: 1,
    bedroomMax: 8,
    bathroomMin: 1,
    bathroomMax: 8,
    squareMetersMin: 0,
    squareMetersMax: 200,
    yearBuiltMin: 1990,
    yearBuiltMax: 2010,
    propertyType: "House",
    location: null,
    order: null
  });

  const [queryInfo, setQueryInfo] = useState({
    total: 0,
    offset: 0,
    limit: 10,
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value !== "" ? value : null,
    });
  };

  const handleApplyFilters = async () => {
    const queryParams = mapFormValuesToQueryParams(formValues);
    const filteredParams = Object.entries(queryParams).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      const response = await axiosInstance.get("http://localhost:8004/queryProperties", {
        params: filteredParams
      });
      const { entries, total, offset, limit } = response.data;

      setSearchResults(entries);
      setQueryInfo({ total, offset, limit });
    } catch (error) {
    }
  };

  return (
    <SearchContext.Provider value={{
      searchResults,
      setSearchResults,
      formValues,
      setFormValues,
      handleInputChange,
      queryInfo,
      handleApplyFilters,
      setQueryInfo
    }}>
      {children}
    </SearchContext.Provider>
  );
};
