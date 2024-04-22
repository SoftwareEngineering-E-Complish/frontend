import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FormControl, InputLabel, TextField, Select, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { Button, Grid, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axiosInstance from '../api/axiosInstance';
import { useLocation } from 'react-router-dom';


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

function EditAdd({ newCreated }) {
  const location = useLocation();
  const property = location.state.property;
  console.log(property);
  console.log(property.title)

  // Now you can use the property object

  const [formState, setFormState] = useState({
    title: '',
    property_type: '',
    price: '',
    square_meters: '',
    bathrooms: '',
    bedrooms: '',
    location: '',
    address: '',
    year_built: '',
    description: '',
    images: [],
  });

  useEffect(() => {
    if (property) {
      setFormState({
        title: property.title || '',
        property_type: property.property_type || '',
        price: property.price || '',
        square_meters: property.square_meters || '',
        bathrooms: property.bathrooms || '',
        bedrooms: property.bedrooms || '',
        location: property.location || '',
        address: property.address || '',
        year_built: property.year_built || '',
        description: property.description || '',
        images: property.images || [],
      });
    }
  }, [property]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const fieldWidth = isSmallScreen ? '90%' : '45%';
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


  const convertImagesToBlobs = async (images) => {
    const blobPromises = images.map((image) =>
      fetch(image)
        .then((res) => res.blob())
        .then((blob) => {
          return blob;
        })
    );
    const blobImages = await Promise.all(blobPromises);
    return {
      ...formState,
      images: blobImages,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newState = await convertImagesToBlobs(images);
    console.log(newState);
    if (newCreated) {
      try {
        const formData = new FormData();
        formData.append('content', JSON.stringify(newState));
        for (let i = 0; i < newState.images.length; i++) {
          formData.append('images', newState.images[i]);
        }
        await axiosInstance.post('/createProperty', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setError('success');
      } catch (error) {
        setError('Error creating new ad');
      }
    }
    else {
      try {
        await axiosInstance.post('/updateProperty', { 'content': newState });
        setError('success');
      } catch (error) {
        setError('Error updating new ad');
      }
    }
  };

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
      <Typography variant="h4" align="center" sx={{ mb: 4, py: 1 }}>Update Ad</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", py: 1 }}>
        <TextField label="Title" name="title" value={formState.title} onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth, alignContent: 'center' }} />
        <FormControl sx={{ mb: verticalPadding, width: fieldWidth, alignContent: 'center' }}>
          <InputLabel id="select_property_type">Type of property</InputLabel>
          <Select
            labelId="select_property_type-label"
            id="select_property_type-select"
            value={formState.property_type}
            label="property_type"
            onChange={(event) => handleChangeDropdown('property_type', event)}
          >
            <MenuItem value={'House'}>House</MenuItem>
            <MenuItem value={'Apartment'}>Apartment</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Price in sfr" value={formState.price} name="price" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Surface in m2" value={formState.square_meters} name="square_meters" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Construction year" value={formState.year_built} name="year_built" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Number of Bathrooms" value={formState.bathrooms} name="bathrooms" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Number of Bedrooms" value={formState.bedrooms} name="bedrooms" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="City" name="location" value={formState.location} onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Address" name="address" value={formState.address} onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Description" name="description" value={formState.description} multiline rows={4} onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />

        <Button variant="contained" component="label" onClick={handleButtonClick}>
          Upload Images
        </Button>
        <div sx={{ mb: verticalPadding, width: fieldWidth }}>
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
                              <Paper style={{ padding: '10px', height: '200px' }}>
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
        <Button type="submit" variant="contained" sx={{ mt: 7 }} color="primary" onClick={handleSubmit}>Publish Listing</Button>
      </Box>
      {error && (
        <Box sx={{ mt: 2 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
    </form>
  );
}

export default EditAdd;
