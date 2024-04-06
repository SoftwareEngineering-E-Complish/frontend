import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FormControl, InputLabel, TextField,Select,MenuItem} from '@mui/material';
import { useEffect } from 'react';
import { Button, Grid, Typography,IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axiosInstance from '../api/axiosInstance';


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

function AddPage({ newCreated }) { 
  const [formState, setFormState] = useState({});
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const fieldWidth = isSmallScreen ? '90%' : '45%';
  const verticalPadding = 2

  useEffect(() => {
    if (newCreated) {
      setFormState({
        title: '',
        property_type: '',
        price: '',
        square_meters: '',
        bathrooms: '',
        bedrooms: '',
        location: '',
        description: '',
        images: [],
      });
    } else {
      // Replace 'ad' with actual listing
      const ad = {
        adName: 'Example Ad',
        property_type: 'house',
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
  
  const setBlobImages = (imagess) => {
    setFormState((prevState) => ({
      ...prevState,
      images: imagess,
    }));
  }
  
  const convertImagesToBlobs = async (images) => {
    const blobPromises = images.map((image) =>
      fetch(image)
        .then((res) => res.blob())
        .then((blob) => {
          return blob;
        })
    );
    const blobImages = await Promise.all(blobPromises);
    setBlobImages(blobImages);
  };
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    await convertImagesToBlobs(images);
    if (newCreated) {
        try {
      await axiosInstance.post('/createProperty', {'content': formState});
      setError('success');
  } catch (error) {
      setError('Error creating new ad');
  }

    }
    else {
      try {
        await axiosInstance.post('/updateProperty',  {'content': formState});
        setError('success');
    } catch (error) {
        setError('Error updating new ad');
    }

    }
  };

  useEffect(() => {
    console.log(formState);
  }, [formState]);

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
        <InputLabel id="select_property_type">property_type</InputLabel>
        <Select
          labelId="select_property_type-label"
          id="select_property_type-select"
          value={formState.property_type}
          label="property_type"
            onChange={(event) => handleChangeDropdown('property_type', event)}
            >
          <MenuItem value={'house'}>house</MenuItem>
          <MenuItem value={'appartament'}>appartament</MenuItem>
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
        <TextField  label="Price in sfr" name="price"  onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField  label="Surface in m2" name="square_meters"  type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField label="Number of Rooms" name="rooms" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField label="Number of Bathrooms" name="bathrooms" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField label="Number of Bedrooms" name="bedrooms" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
        <TextField label="location" name="address" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }}/>
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
                          <Paper style={{ padding: '10px',height: '200px' }}>
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
        <Button type="submit" variant="contained" sx={{ mt: 7}} color="primary" onClick={handleSubmit}>Publish Listing</Button>
        </Box>
        {error && (
        <Box sx={{ mt: 2 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
    </form>
  );
}

export default AddPage;
