import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  const [formValues, setFormValues] = useState({
    priceMin: 0,
    priceMax: 50000,
    bedroomMin: null,
    bedroomMax: null,
    bathroomMin: null,
    bathroomMax: null,
    squareMetersMin: null,
    squareMetersMax: null,
    yearBuiltMin: null,
    yearBuiltMax: null,
    propertyType: null,
    location: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <SearchContext.Provider value={{ 
      searchResults,
      setSearchResults,
      formValues,
      handleInputChange, }}>
      {children}
    </SearchContext.Provider>
  );
};
