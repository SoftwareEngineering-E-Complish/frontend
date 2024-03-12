import React, {useState} from 'react';
import './landing.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function NewLandingPage() {

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');

  const search = async () => {
    try{
      const requestBody = JSON.stringify(userInput);
      const response = axios.post("/searchendpoint", requestBody);
      const searchResults = response.data;
      
      navigate('/properties' ,{ state: { searchResults }}); 
    } catch(error) {
      navigate('/properties')
    }
  };

  return (
    <div className="full-background">
      <div className="search-container">
      <h1 className="search-header">Find <span style={{ color: '#E0FFFF' }}>Your</span> Dream Home</h1>
      <h2 className="search-subheader">Using <span style={{ color: '#E0FFFF' }}>Your</span> own words</h2>
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
