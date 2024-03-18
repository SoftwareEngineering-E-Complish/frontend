import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { FormControl, InputLabel, TextField,Select,MenuItem,NativeSelect} from '@mui/material';
import { useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, [query]);
  return matches;
};

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

function ProfilePage({ newCreated }) { 
  const [formState, setFormState] = useState({
    adName: '',
    category: '',
    transactionType: '',
    price: '',
    surface: '',
    rooms: '',
    bathrooms: '',
    bedrooms: '',
    city: '',
    zip_code: '',
    address: '',
    canton: '',
    description: '',
    images: [],
  });

  useEffect(() => {
    if (newCreated) {
      setFormState({
        adName: '',
        category: '',
        transactionType: '',
        price: '',
        surface: '',
        rooms: '',
        bathrooms: '',
        bedrooms: '',
        city: '',
        zip_code: '',
        address: '',
        canton: '',
        description: '',
        images: [],
      });
    } else {
      // Logic to set form state based on some 'ad' object, assuming 'ad' is available
      // Replace 'ad' with the actual logic to get the ad details
      const ad = {
        adName: 'Example Ad',
        category: 'house',
        transactionType: 'sell',
        price: '100000',
        // Rest of the properties
      };

      setFormState({
        ...ad,
      });
    }
  }, [newCreated]);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const [category, setCategory] = React.useState('Category');
  const fieldWidth = isSmallScreen ? '90%' : '45%';
  const imageRows = isSmallScreen ? 1 : 2;
  const verticalPadding = 2

  
  const handleChangeDropdown = (name, event) => {
    const value = event.target.value;
  
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  const handleImageUpload = (event) => {
    setFormState({
      ...formState,
      images: event.target.files,
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };
  return (
    <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" sx={{ mb: 4 ,py:1}}>Create Ad</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column',alignItems:"center", py:1}}>
        <TextField label="Ad Name" name="adName" onChange={handleChange} sx={{ mb: verticalPadding, width:fieldWidth, alignContent:'center'}} />
        <FormControl sx={{ mb: verticalPadding, width:fieldWidth, alignContent:'center'}}>
        <InputLabel id="select_category">Category</InputLabel>
        <Select
          labelId="select_category-label"
          id="select_category-select"
          value={formState.category}
          label="category"
            onChange={(event) => handleChangeDropdown('category', event)}
            >
          <MenuItem value={'house'}>house</MenuItem>
          <MenuItem value={'appartament'}>appartament</MenuItem>
          <MenuItem value={'office'}>office</MenuItem>
          <MenuItem value={'commercial'}>commercial</MenuItem>
          <MenuItem value={'industrial'}>industrial</MenuItem>
          <MenuItem value={'land'}>land</MenuItem>
          <MenuItem value={'garage'}>garage</MenuItem>
          <MenuItem value={'other'}>other</MenuItem>
        </Select>
        </FormControl>
        <FormControl sx={{ mb: verticalPadding, width:fieldWidth, alignContent:'center'}}>
        <InputLabel id="demo-simple-select-label">Transaction Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formState.transactionType}
          label=" transactionType"
          onChange={(event) => handleChangeDropdown('transactionType', event)}
        >
          <MenuItem value={'sell'}>rent</MenuItem>
          <MenuItem value={'rent'}>sell</MenuItem>
        </Select>
        </FormControl>
        <TextField  label="Price in sfr" name="price" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField  label="Surface in m2" name="surface"  type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField label="Number of Rooms" name="rooms" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField label="Number of Bathrooms" name="bathrooms" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField label="Number of Bedrooms" name="bedrooms" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField label="City" name="city" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField label="Postalcode" name="zip_code" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField label="Address" name="address" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField label="Canton" name="canton" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField label="Description" name="description" multiline rows={4} onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <input type="file" name="images" onChange={handleImageUpload} multiple style={{ display: 'none' }} id="raised-button-file" />
        <label htmlFor="raised-button-file">
          <Button variant="raised" component="span">
            Upload Images
          </Button>
        <ImageList sx={{ width: "100%", height: 450 }} cols={imageRows} rowHeight={264}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=364&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>


        </label>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>

x
    </form>
  );
}

export default ProfilePage;
