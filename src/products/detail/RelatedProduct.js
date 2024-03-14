
import { Link , useParams} from "react-router-dom";
import { housesData } from'../../mockdata';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearch } from '../../SearchContext';

function RelatedProduct(props) {
  let { id } = useParams();
  console.log("id" + id);
  const { searchResults } = useSearch();
  const property = searchResults.find(p => p.propertyId === id);
  
    
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
          src={property.image}
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
