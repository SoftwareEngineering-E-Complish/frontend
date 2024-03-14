
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../bootstrap-custom.css';
import { housesData } from'../mockdata';

function Product({ product }) {

  //const property = housesData.find(house => house.propertyId === productId);
  const property = product;

  return (
    <div className="col">
      <div className="card shadow-sm rounded-corners-card">
      <Link 
        to={`/properties/${property.propertyId}`} 
        state={{ property }}
        replace
      >
          <img
            className="card-img-top bg-dark cover rounded-corners-image"
            height="200"
            alt=""
            src={property.image}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-dark text-truncate">
            {property.title}
          </h5>
          <div className=" mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {property.location}
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
    </div>
  );
}

export default Product;
