import RelatedProduct from "./RelatedProduct";
import Ratings from "react-ratings-declarative";
import { Link, useParams } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { housesData } from '../../mockdata';
import { useSearch } from '../../SearchContext';
import getPropertySecondaryImages from "../../api/queries";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../api/axiosInstance';

const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function ProductDetail() {
  let { id } = useParams();
  const { searchResults, allProperties, setAllProperties } = useSearch();
  const [property, setProperty] = useState(null);

  const [isInterested, setIsInterested] = useState(false);
  const [interestButtonText, setInterestButtonText] = useState("Declare Interest");
  const idToken = localStorage.getItem('idToken');
  let userId = '';
  if (idToken && idToken !== '') {
    const decoded = jwtDecode(idToken);
    userId = decoded.sub;
  }
  const agent = housesData[0].agent;
  const image = property?.primaryImage ?? housesData[1].imageLg;
  const [secondaryImages, setSecondaryImages] = useState([]);

  useEffect(() => {
    const fetchSecondaryImages = async () => {
      try {
        const images = await getPropertySecondaryImages(property.propertyId);
        setSecondaryImages(images);
      } catch (error) {
        console.error('Error fetching secondary images:', error);
      }
      
    };


    fetchSecondaryImages();

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




  useEffect(() => {
    checkInterestStatus();
  }, [id]);

  const checkInterestStatus = async () => {
    try {

      const response = await axios.get(`http://localhost:8004/fetchInterestsByUser?userId=${encodeURIComponent(userId)}`);
      const interests = response.data;

      const isInterested = interests.some(interest => interest.propertyId === Number(id));
      setIsInterested(isInterested);
      setInterestButtonText(isInterested ? "Remove Interest" : "Declare Interest");
    } catch (error) {
      console.error('Failed to fetch interest status:', error);
      setIsInterested(false);
      setInterestButtonText("Declare Interest");
    }
  };


  const handleInterest = async () => {
    const timestamp = new Date().toISOString();
    if(!localStorage.getItem('accessToken')){
      const response = await axiosInstance.get("/loginURL");
      window.location.replace(response.data);
    }
    if (!isInterested) {
      try {
        await axios.post('http://localhost:8004/declareInterest', {
          propertyId: Number(id),
          userId: userId,
          timestamp: timestamp
        });
        setIsInterested(true);
        setInterestButtonText("Remove Interest");
      } catch (error) {
        console.error('Error declaring interest:', error);
      }
    } else {
      try {
        await axios.delete('http://localhost:8004/removeInterest', {
          data: { propertyId: Number(id), userId: userId }
        });
        setIsInterested(false);
        setInterestButtonText("Declare Interest");
      } catch (error) {
        console.error('Error removing interest:', error);
      }
    }
  };

  if (!property) return <div className="spinner text-center">Loading...</div>;


  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/properties">
              All Properties
            </Link>
          </li>
          <li className="breadcrumb-item">
            <a className="text-decoration-none link-secondary" href="!#">
              Houses
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {property.title}
          </li>
        </ol>
      </nav>
      <div className="row mb-4">
        <div className="d-none d-lg-block col-lg-1">
          <div className="image-vertical-scroller">
            <div className="d-flex flex-column">
              {secondaryImages?.map((secondaryImage, i) => {
                let selected = i !== 1 ? "opacity-6" : "";
                return (
                  <a key={i} href="">
                    <img
                      className={"rounded mb-2 ratio " + selected}
                      alt=""
                      src={secondaryImage ?? image}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = housesData[1].image;
                      }}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="border rounded ratio ratio-1x1"
                alt=""
                src={image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = housesData[1].imageLg;
                }}
              />
            </div>
          </div>


        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-1">{property.title}</h2>
            <h4 className="text-muted mb-4">{property.price} $</h4>

            <div className="row g-3 mb-4">
              <div className="col">
                <button className="btn btn-outline-dark py-2 w-100" onClick={handleInterest}>
                  {interestButtonText}
                </button>
              </div>
              <div className="col">
                <Link to={{ pathname: "/profile" }} state={{ agent: agent }} className="btn btn-dark py-2 w-100">View profile</Link>
              </div>
            </div>

            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Type</dt>
              <dd className="col-sm-8 mb-3">{property.property_type}</dd>

              <dt className="col-sm-4">Owner</dt>
              <dd className="col-sm-8 mb-3">owner name</dd>

              <dt className="col-sm-4">Constructed in</dt>
              <dd className="col-sm-8 mb-3">{property.year_built}</dd>

              <dt className="col-sm-4">Location</dt>
              <dd className="col-sm-8 mb-3">{property.location}</dd>

              <dt className="col-sm-4">Bedrooms</dt>
              <dd className="col-sm-8 mb-3">{property.bedrooms}</dd>

              <dt className="col-sm-4">Bathrooms</dt>
              <dd className="col-sm-8 mb-3">{property.bathrooms}</dd>

              <dt className="col-sm-4">Surface</dt>
              <dd className="col-sm-8 mb-3">{property.square_meters}</dd>

              <dt className="col-sm-4">Seller Rating</dt>
              <dd className="col-sm-8 mb-3">
                <Ratings
                  rating={4.5}
                  widgetRatedColors="rgb(253, 204, 13)"
                  //changeRating={changeRating}
                  widgetSpacings="2px"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    return (
                      <Ratings.Widget
                        key={i}
                        widgetDimension="20px"
                        svgIconViewBox="0 0 19 20"
                        svgIconPath={iconPath}
                        widgetHoverColor="rgb(253, 204, 13)"
                      />
                    );
                  })}
                </Ratings>
              </dd>
            </dl>

            <h4 className="mb-0">Description</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>
                {property.description}
              </small>
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Related properties</h4>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            {Array.from({ length: 4 }, (_, i) => {
              return (
                <RelatedProduct key={i} index={i} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
