
import { Link , useParams} from "react-router-dom";
import { housesData } from'../../mockdata';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearch } from '../../SearchContext';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function RelatedProduct(props) {
  let { id } = useParams();
  const { searchResults } = useSearch();
  const [property, setProperty] = useState(null);
  //const property = searchResults.find(p => p.propertyId === Number(id));
  const image = housesData[3].image;
  

  useEffect(() => {

    const fetchProperty = async () => {
      var prop = await searchResults.find(p => p.propertyId === Number(id));
      if (prop === undefined){
        const response = await axios.get(`http://localhost:8004/properties/${id}`); 
        prop = response.data;
      }
      setProperty(prop);
    }
    fetchProperty();

  }, [id]);
    
  if (!property) return <div className="spinner text-center">Loading...</div>;
  return (
    <Link
      to="/properties/1"
      className="col text-decoration-none"
      href="!#"
      replace
    >
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="200"
          alt=""
          src={image}
        />
        <div className="card-body">
          <h5 className="card-title text-dark text-truncate">
            {property.title}
          </h5>
          <div className=" mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {property.country}
          </div>
          <div className="d-grid d-block">
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-outline-dark btn-sm rounded-pill mt-3 me-2" disabled>
              {property.bedrooms} rooms
            </button>
            <button type="button" className="btn btn-outline-dark btn-sm  rounded-pill mt-3 me-2" disabled>
              {`${property.price} $`}
            </button>
            <button type="button" className="btn btn-outline-dark btn-sm  rounded-pill mt-3" disabled>
              {`${property.square_meters}`}
            </button>
    </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RelatedProduct;
