import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from "../../products/Product";

function SimpleProductList({ propertyIds }) {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!propertyIds || propertyIds.length === 0) {
            setLoading(false);
            return;
        }

        const fetchProperties = async () => {
            setLoading(true);
            try {
                const propertyDetails = await Promise.all(propertyIds.map(id =>
                    axios.get(`http://localhost:8004/properties/${id}`).then(res => res.data)
                ));
                setProperties(propertyDetails);
                setError('');  // Clear any previous errors if fetch is successful
            } catch (error) {
                console.error('Failed to fetch properties:', error);
                setError('Failed to fetch properties. Please try again later.');
                setProperties([]);  // Clear existing properties in case of error
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [propertyIds]);

    if (loading) return <div className="spinner text-center">Loading...</div>;
    if (error) return <div className="text-center text-danger">{error}</div>;
    if (properties.length === 0) return <div className="text-center">No properties found</div>;

    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {properties.map(property => (
                <Product key={property.propertyId} product={property} ownProperty={false}/>
            ))}
        </div>
    );
}

export default SimpleProductList;
