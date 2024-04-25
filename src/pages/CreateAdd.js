import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FormControl, InputLabel, TextField,Select,MenuItem} from '@mui/material';
import { useEffect } from 'react';
import { Button, Grid, Typography,IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axiosInstance from '../api/axiosInstance';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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

function AddPage() { 
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state ? location.state.property : null;
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const fieldWidth = isSmallScreen ? '90%' : '45%';
  const verticalPadding = 2
  const [formState, setFormState] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (property) {
      setFormState({
        title: property.title ,
        property_type: property.property_type ,
        price: property.price ,
        square_meters: property.square_meters ,
        bathrooms: property.bathrooms ,
        bedrooms: property.bedrooms ,
        location: property.location ,
        address: property.address ,
        year_built: property.year_built ,
        description: property.description ,
        images: property.images || [],
      });
    } else {
      setFormState({
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
    }
  }, [property]);

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
    validateField(name, value);
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
  const isFormValid = () => {
    for (let key in formState) {
      if (formState[key] === '') {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setFormValid(isFormValid());
  }, [formState]);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const newState = await convertImagesToBlobs(images);
    if (!property) {
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
      navigate('/profile');
      } catch (error) {
      setError('Error creating new ad');
      }
    }
    if (property) {
      console.log('hello')
      try {
        const formData = new FormData();
        const propertyId = property.propertyId;
        formData.append('content', JSON.stringify(formState));
        console.log(formState)
        await axiosInstance.put('/updateProperty/' + propertyId, {'content': formState}, {
          headers: {
            'Content-Type': 'application/json', 
          },
        });
        setError('success');
        navigate('/profile');
      } catch (error) {
        setError('Update Add');
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

  const validateField = (name, value) => {
    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `The ${name} field is required`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
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
        <TextField label="Title" name="title" error={errors.title !== ''} onChange={handleChange} sx={{ mb: verticalPadding, width:fieldWidth, alignContent:'center'}} />
        <FormControl sx={{ mb: verticalPadding, width:fieldWidth, alignContent:'center'}}>
        <InputLabel id="select_property_type">Type of property</InputLabel>
        <Select
          error={formState.property_type === ''}
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
        <TextField label="Price in sfr"  error={errors.price !== ''} value={formState.price} name="price" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Surface in m2" error={errors.square_meters !== ''} value={formState.square_meters} name="square_meters" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Construction year" error={errors.year_built !== ''} value={formState.year_built} name="year_built" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Number of Bathrooms" error={errors.bathrooms !== ''} value={formState.bathrooms} name="bathrooms" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Number of Bedrooms" error={errors.bedrooms !== ''} value={formState.bedrooms} name="bedrooms" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="City" name="location" error={errors.location !== ''} value={formState.location} onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Address" name="address" error={errors.address !== ''} value={formState.address} onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Description" name="description" error={errors.description !== ''} value={formState.description} multiline rows={4} onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
      {!property && 
        <Button variant="contained" component="label" onClick={handleButtonClick}>
          Upload Images
        </Button>
        }
        {!property && 
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
        }
        <Button type="submit" variant="contained" sx={{ mt: 7}} color="primary" disabled={!formValid} onClick={handleSubmit}>Publish Listing</Button>
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
