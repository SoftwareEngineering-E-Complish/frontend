const mapQueryParamsToFormValues = (queryParams) => {
    return {
        priceMin: queryParams.price_min || 0,
        priceMax: queryParams.price_max || 10000000,
        bedroomMin: queryParams.bedrooms_min,
        bedroomMax: queryParams.bedrooms_max,
        bathroomMin: queryParams.bathroom_min,
        bathroomMax: queryParams.bathroom_max,
        squareMetersMin: queryParams.square_meters_min,
        squareMetersMax: queryParams.square_meters_max,
        yearBuiltMin: queryParams.year_built_from,
        yearBuiltMax: queryParams.year_built_to,
        propertyType: queryParams.property_type,
        location: queryParams.location,
        order: queryParams.order
    };
};

export default mapQueryParamsToFormValues;
