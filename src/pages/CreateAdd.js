import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FormControl, InputLabel, TextField,Select,MenuItem} from '@mui/material';
import { useEffect } from 'react';
import { Button, Grid, Typography,IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


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


function AddPage({ newCreated }) { 

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
    images: [], // provide an initial value of an empty array
  });
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const fieldWidth = isSmallScreen ? '90%' : '45%';
  const verticalPadding = 2
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
      // Replace 'ad' with actual listing
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
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };
  const [images, setImages] = useState([]);
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...imageUrls]);
  };
  const handleButtonClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = handleFileSelect;
    input.click();
  };

  const handleDeleteClick = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  };
  const isFirstImage = (index) => index === 0;

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

        <Button variant="contained" component="label" onClick={handleButtonClick}>
        Upload Images
      </Button>
      <div  sx={{ mb: verticalPadding, width: fieldWidth }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="image-grid">
          {(provided) => (
            <Grid container spacing={3} ref={provided.innerRef} {...provided.droppableProps}>
              {images.map((image, index) => (
                <Draggable key={image} draggableId={image} index={index}>
                  {(provided) => (
                    <Grid item xs={4}>
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div style={{ position: 'relative' }}>
                          <Paper style={{ padding: '10px' }}>
                            <img
                              src={image}
                              alt={`Uploaded image ${index}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {isFirstImage(index) && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: 'rgba(0, 0, 0, 0,0)',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  color: 'white',
                                  fontWeight: 'bold',
                                }}
                              >
                                Gallery Image
                              </div>
                            )}
                          </Paper>
                          <IconButton
                            aria-label="delete"
                            size="large"
                            style={{ position: 'absolute', top: 5, right: 5, zIndex: 999 }}
                            onClick={() => handleDeleteClick(index)}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                      </div>
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
      </div>
        <Button type="submit" variant="contained" sx={{ mt: 7}} color="primary">Publish Listing</Button>

        </Box>
    </form>
  );
}

export default AddPage;
