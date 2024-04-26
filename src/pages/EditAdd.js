import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FormControl, InputLabel, TextField,Select,MenuItem} from '@mui/material';
import { useEffect } from 'react';
import { Button, Grid, Typography,IconButton, Paper,  List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

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

function EditAdd() { 
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state ? location.state.property : null;
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const fieldWidth = isSmallScreen ? '90%' : '45%';
  const verticalPadding = 2
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
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [usersInterested, setUsersInterested] = useState([]);


  useEffect(() => {
    if (property) {
      fetchInterestedUsers(property.propertyId);
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
    let isValid = true;
    for (let key in formState) {
      if (key !== 'images' && formState[key] === '') {
        isValid = false;
        break;
      }
    }
    setFormValid(isValid);
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
    else {
      try {
        const formData = new FormData();
        const propertyId = property.propertyId;
        formData.append('content', JSON.stringify(formState));
        await axiosInstance.put('/updateProperty/' + propertyId, {'content': formState});
        navigate('/profile');
      } catch (error) {
        console.log(error);
        navigate('/profile');
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
  
  useEffect(() => {
    if (formState.property_type) {
      handleChangeDropdown('property_type', { target: { value: formState.property_type } });
    }
  }, [formState.property_type]);

  const fetchInterestedUsers = async (propertyId) => {
    try {
      //let response = await axiosInstance.get(`/fetchInterestsByUser`, { params: { userId: username /*accessToken: accessToken*/ } });
      const response = await axios.get(`http://localhost:8004/fetchInterestsByProperty?propertyId=${encodeURIComponent(propertyId)}`);
      const interestUsers = response.data.map(interest => interest.propertyId);
      setUsersInterested(interestUsers);
  } catch (error) {
      console.error('Error fetching users interested:', error);
  }  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
  };

  const isFirstImage = (index) => index === 0;

  return (
    <form onSubmit={handleSubmit} sx={{ backgroundColor: 'white' }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 ,py:1}}>{property ? 'Update Property' : 'Create Property'}</Typography>
        {property &&
        <Box sx={{ display: 'flex', flexDirection: 'column',alignItems:"center", py:1}}>
        <Grid container spacing={2} direction={isSmallScreen ? 'column' : 'row'} alignItems="center" justifyContent="center" sx={{ mb: 4, width: fieldWidth }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" align="center" sx={{ mb: 4, py: 2 }}>
              Number of interested users: {usersInterested.length}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: verticalPadding, width: '100%', margin: 'auto', border: '1px solid #000', overflow: 'auto', maxHeight: 200, py: 2 }}>
              {usersInterested.length > 0 ? (
                usersInterested.map((user, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`Username ${index + 1}: ${user}`}  />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No users are currently interested in this property." />
                </ListItem>
              )}
            </Box>
          </Grid>
        </Grid>
        </Box>
        }
        <Box sx={{ display: 'flex', flexDirection: 'column',alignItems:"center", py:1}}>
        {formState.property_type | !property &&
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
        };
        <TextField label="Title" name="title" error={formState.title == ''} value={formState.title} onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth, alignContent: 'center' }} />
        <TextField label="Price in sfr"  error={formState.price == ''} value={formState.price} name="price" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Surface in m2" error={formState.square_meters == ''} value={formState.square_meters} name="square_meters" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Construction year" error={formState.year_built == ''} value={formState.year_built} name="year_built" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Number of Bathrooms" error={formState.bathrooms == ''} value={formState.bathrooms} name="bathrooms" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Number of Bedrooms" error={formState.bedrooms == ''} value={formState.bedrooms} name="bedrooms" type="number" onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="City" name="location" error={formState.location == ''} value={formState.location} onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Address" name="address" error={formState.address == ''} value={formState.address} onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
        <TextField label="Description" name="description" error={formState.description == ''} value={formState.description} multiline rows={4} onChange={handleChange} sx={{ mb: verticalPadding, width: fieldWidth }} />
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

export default EditAdd;
