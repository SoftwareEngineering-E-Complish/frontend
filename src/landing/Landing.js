import React, {useState} from 'react';
import './landing.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSearch } from '../SearchContext';
import { housesData } from '../mockdata';


function NewLandingPage() {

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const { setSearchResults } = useSearch();

  const search = async () => {
  
  try {
    const response = await axios.get("http://localhost:8004/properties", {
      params: { user_query: userInput }
    });
    const searchResults = response.data;
    console.log(searchResults, "results");
    
    setSearchResults(searchResults); 
    navigate('/properties');
    } catch(error) {
      navigate('/properties')
    }
  };

  return (
    <div className="full-background">
      <div className="search-container">
      <h1 className="search-header">Test <span style={{ color: '#E0FFFF' }}>Your</span> Dream Home</h1>
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
