import React, { useState } from 'react';
import '../styles/landing.css';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../SearchContext';
import axiosInstance from '../api/axiosInstance';
import mapQueryParamsToFormValues from '../components/helpers/mapQueryParamsToFormValues';



function NewLandingPage() {

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const { setSearchResults, setQueryInfo, setFormValues, formValues } = useSearch();

  const search = async () => {
    try {
      const response = await axiosInstance.get("/initial_query", {
        params: { user_query: userInput }
      });
      const { entries, total, offset, limit, filters } = response.data;
      //setSearchResults(entries);
      setQueryInfo({ total, offset, limit });
      const newFilters =  mapQueryParamsToFormValues(filters);
      setFormValues(prevValues => ({
        ...prevValues,
        ...newFilters
      }));
      //const searchResults = response.data.entries;

      const imageFetchingPromises = entries.map(async (property) => {
        const response = await axiosInstance.get("/getPrimaryImageUrl", {
          params: { propertyId: property.propertyId }
        });

        property.primaryImage = response.data;
      });
      await Promise.all(imageFetchingPromises);

      setSearchResults(entries);

      navigate('/properties');
    } catch (error) {
      console.log(error)
      //navigate('/properties');
    }
  };

  return (
    <div className="full-background">
      <div className="search-container">
        <h1 className="search-header">Find <span style={{ color: '#E0FFFF' }}>Your</span> Dream Home</h1>
        <h2 className="search-subheader">Using <span style={{ color: '#E0FFFF' }}>Your</span> Own Words</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search properties"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        /> <button className="search-button" onClick={search}>Search</button>
      </div>
    </div>
  );
}

export default NewLandingPage;
