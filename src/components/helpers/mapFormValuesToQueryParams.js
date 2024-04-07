const mapFormValuesToQueryParams = (formValues) => {
    return {
      price_min: formValues.priceMin,
      price_max: formValues.priceMax,
      bedrooms_min: formValues.bedroomMin,
      bedrooms_max: formValues.bedroomMax,
      bathroom_min: formValues.bathroomMin,
      bathroom_max: formValues.bathroomMax,
      square_meters_min: formValues.squareMetersMin,
      square_meters_max: formValues.squareMetersMax,
      year_built_from: formValues.yearBuiltMin,
      year_built_to: formValues.yearBuiltMax,
      property_type: formValues.propertyType,
      location: formValues.location,
      order: formValues.order
    };
  };

  export default mapFormValuesToQueryParams;