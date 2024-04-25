import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import '../bootstrap-custom.css';
import { housesData } from '../mockdata';

function ProductH({ product }) {

  //const property = housesData.find(house => house.propertyId === productId);
  const property = product;
  const image = product.primaryImage ?? housesData[1].imageLg;
  const location = useLocation();
  const profilePage = location.pathname === '/profile';

  return (
    <div className="col">
      <div className="card shadow-sm rounded-corners-card">
        <div className="row g-0">
          <div className="col-4">
            <Link to={`/properties/${property.propertyId}`} href="!#" replace>
              <img
                className=" bg-dark cover w-100 h-100 rounded-corners-image"
                alt=""
                src={image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = housesData[1].imageLg;
                }}
              />
            </Link>
          </div>
          <div className="col-8">
            <div className="card-body h-100">
              <div className="d-flex flex-column h-100">
                <h5 className="card-title text-dark text-truncate mb-1">
                  {property.title}
                </h5>
                <div className=" mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {property.location}
                </div>
                <div className="d-grid d-block mb-0 mt-3">
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-dark btn-sm rounded-pill me-2" disabled>
                      {property.bedrooms} rooms
                    </button>
                    <button type="button" className="btn btn-outline-dark btn-sm rounded-pill me-2" disabled>
                      {`${property.price} $`}
                    </button>
                    <button type="button" className="btn btn-outline-dark btn-sm rounded-pill" disabled>
                      {`${property.square_meters}`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductH;
