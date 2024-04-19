import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [allProperties, setAllProperties] = useState([]);

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
    order:null
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

  return (
    <SearchContext.Provider value={{ 
      searchResults,
      setSearchResults,
      formValues,
      setFormValues,
      handleInputChange, 
      queryInfo,
      setQueryInfo}}>
      {children}
    </SearchContext.Provider>
  );
};
