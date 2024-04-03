import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { housesData } from "../../mockdata";
import { useSearch } from '../../SearchContext';
import ProductListBody from "./ProductListBody";

const brands = ["1-3", "3-4", "4-6", "6 +"];
const manufacturers = ["30sqm - 60sqm", "60sqm - 90sqm", "90sqm - 120sqm", "120sqm +"];
const categories = [
    "Houses for Sale",
    "Apartments for Sale",
    "Houses for Rent",
    "Apartments",
    "Apartments for Rent",
    "Houses",
  ];
  

function FilterMenuLeft() {
  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">Browse</h5>
        <div className="d-flex flex-wrap my-2">
          {categories.map((v, i) => {
            return (
              <Link
                key={i}
                to="/products"
                className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                replace
              >
                {v}
              </Link>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-1">Rooms</h5>
        <div className="d-flex flex-column">
          {brands.map((v, i) => {
            return (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-3">Living space</h5>
        <div className="d-flex flex-column">
          {manufacturers.map((v, i) => {
            return (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-1">Location</h5>
        <div className="col-lg-3 d-none d-lg-block">
          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue=""
          >
            <option value="">Zurich</option>
            <option value="1">Basel</option>
            <option value="2">Geneva</option>
            <option value="3">Lausanne</option>
            <option value="4">Bern</option>
            <option value="4">Lucerne</option>
            <option value="4">St. Gallen</option>
            <option value="4">Biels</option>
            <option value="4">Thun</option>
            <option value="4">Winterthur</option>
          </select>
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Price Range</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Min"
              defaultValue="100000"
            />
            <label htmlFor="floatingInput">Min Price</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Max"
              defaultValue="500000"
            />
            <label htmlFor="floatingInput">Max Price</label>
          </div>
          <button className="btn btn-dark">Apply</button>
        </div>
      </li>
    </ul>
  );
}

export default FilterMenuLeft;