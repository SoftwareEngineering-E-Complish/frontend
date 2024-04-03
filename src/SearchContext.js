import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  const [formValues, setFormValues] = useState({
    priceMin: 0,
    priceMax: 50000,
    bedroomMin: 1,
    bedroomMax: 1,
    bathroomMin: 1,
    bathroomMax: 1,
    squareMetersMin: 0,
    squareMetersMax: 200,
    yearBuiltMin: 1990,
    yearBuiltMax: 2010,
    propertyType: "House",
    location: null,
    order:null
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
