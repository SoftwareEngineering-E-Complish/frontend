import { useSearch } from '../../SearchContext';
import axiosInstance from '../../api/axiosInstance';

const categories = [
  "House",
  "Apartment"
];

//missing: set default form values
function FilterMenuLeft() {

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

  const { formValues, handleInputChange, setSearchResults } = useSearch();

  const handleApplyFilters = async () => {
    const queryParams = mapFormValuesToQueryParams(formValues);
    const filteredParams = Object.entries(queryParams).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      const response = await axiosInstance.get("http://localhost:8004/queryProperties", {
        params: filteredParams
      });
      const searchResults = response.data.entries;
      console.log(response.data, "response");
      console.log(searchResults, "state");
      console.log(formValues, "filter state");
      console.log(filteredParams, "params")
      setSearchResults(searchResults);
    } catch (error) {
    }
  };
  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">Property Type</h5>
        <div className="d-flex flex-wrap my-2">
          {categories.map((category, i) => (
            <button
              key={i}
              className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
              onClick={() => handleInputChange({ target: { name: 'propertyType', value: category } })}
            >
              {category}
            </button>
          ))}
        </div>
      </li>

      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Price</h5>
        <div className="d-grid d-block mb-3">
          <input
            name="priceMax"
            type="range"
            min="0"
            max="10000000"
            value={formValues.priceMax}
            onChange={handleInputChange}
            className="form-control-range"
          />
          <div>Max Price: ${formValues.priceMax.toLocaleString()}</div>
        </div>
      </li>

      <li className="list-group-item">
        <h5 className="mt-1 mb-1">Location</h5>
        <div className="d-grid d-block mb-3">
          <select
            name="location"
            onChange={handleInputChange}
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
        <h5 className="mt-1 mb-2">Bedrooms</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <select
              name="bedroomMin"
              onChange={handleInputChange}
              className="form-control"
              value={formValues.bedroomMin}
            >
              <option value="">Min</option> {formValues.bedroomMin}
              {Array.from({ length: 11 }, (_, index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
            <label htmlFor="floatingInput">Min bedrooms</label>
          </div>
          <div className="form-floating mb-2">
            <select
              name="bedroomMax"
              onChange={handleInputChange}
              className="form-control"
              value={formValues.bedroomMax}
            >
              <option value="">Max</option> { }
              {Array.from({ length: 11 }, (_, index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
            <label htmlFor="floatingInput">Max bedrooms</label>
          </div>
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Bathrooms</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <select
              name="bathroomMin"
              onChange={handleInputChange}
              className="form-control"
              value={formValues.bathroomMin}
            >
              <option value="">Min</option> {/* Optional placeholder-like option */}
              {Array.from({ length: 11 }, (_, index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
            <label htmlFor="floatingInput">Min bathrooms</label>
          </div>
          <div className="form-floating mb-2">
            <select
              name="bathroomMax"
              onChange={handleInputChange}
              className="form-control"
              value={formValues.bathroomMax}
            >
              <option value="">Max</option> { }
              {Array.from({ length: 11 }, (_, index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
            <label htmlFor="floatingInput">Max bathrooms</label>
          </div>
        </div>
      </li>


      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Living Space</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              name="squareMetersMin"
              onChange={handleInputChange}
              type="text"
              className="form-control"
              placeholder="Min"
              defaultValue={formValues.squareMetersMin}
            />
            <label htmlFor="floatingInput">Min Surface</label>
          </div>
          <div className="form-floating mb-2">
            <input
              name="squareMetersMin"
              onChange={handleInputChange}
              type="text"
              className="form-control"
              placeholder="Max"
              defaultValue={formValues.squareMetersMax}
            />
            <label htmlFor="floatingInput">Max Surface</label>
          </div>
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Year of construction</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              name="yearBuiltMin"
              onChange={handleInputChange}
              type="text"
              className="form-control"
              placeholder="Min"
              defaultValue={formValues.yearBuiltMin}
            />
            <label htmlFor="floatingInput">Min Year</label>
          </div>
          <div className="form-floating mb-2">
            <input
              name="yearBuiltMin"
              onChange={handleInputChange}
              type="text"
              className="form-control"
              placeholder="Max"
              defaultValue={formValues.yearBuiltMax}
            />
            <label htmlFor="floatingInput">Max Year</label>
          </div>
        </div>
      </li>
      <li className="list-group-item">
        <button className="btn btn-dark" onClick={handleApplyFilters}>Apply</button>
      </li>
    </ul>
  );
}

export default FilterMenuLeft;