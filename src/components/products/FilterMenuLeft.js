import { useSearch } from '../../SearchContext';
import axiosInstance from '../../api/axiosInstance';
import { useState, useEffect } from 'react';
import mapFormValuesToQueryParams from '../helpers/mapFormValuesToQueryParams';

const categories = [
  "House",
  "Apartment"
];

function FilterMenuLeft() {
  const { formValues, handleInputChange, setSearchResults, setQueryInfo } = useSearch();
  const [localFormValues, setLocalFormValues] = useState(formValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setLocalFormValues(formValues);
  }, [formValues]);

  const handleLocalInputChange = (event) => {
    const { name, value } = event.target;
    const updatedFormValues = { ...localFormValues, [name]: value };

    setLocalFormValues(updatedFormValues); 
    validateInput(name, value, updatedFormValues); 
  };

  const validateInput = (name, value, updatedFormValues) => {
    const validationPairs = {
      bedroomMin: 'bedroomMax',
      bedroomMax: 'bedroomMin',
      bathroomMin: 'bathroomMax',
      bathroomMax: 'bathroomMin',
      squareMetersMin: 'squareMetersMax',
      squareMetersMax: 'squareMetersMin',
      yearBuiltMin: 'yearBuiltMax',
      yearBuiltMax: 'yearBuiltMin'
    };

    const relatedKey = validationPairs[name];
    let newErrors = {...errors};

    if (relatedKey) {
      const minKey = name.includes('Min') ? name : relatedKey;
      const maxKey = name.includes('Max') ? name : relatedKey;
      const minValue = updatedFormValues[minKey];
      const maxValue = updatedFormValues[maxKey];

      if (parseInt(minValue) > parseInt(maxValue)) {
        newErrors[maxKey] = 'Max cannot be smaller than Min';
      } else {
        delete newErrors[maxKey];
      }
    }

    setErrors(newErrors);
  };

  const handleApplyFilters = async () => {
    if (Object.keys(errors).length > 0) {
      alert("Please enter valid inputs for all fields before applying filters.");
      return;
    }

    Object.entries(localFormValues).forEach(([key, value]) => {
      handleInputChange({ target: { name: key, value } });
    });

    const queryParams = mapFormValuesToQueryParams(localFormValues);
    const filteredParams = Object.entries(queryParams).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      const response = await axiosInstance.get("http://localhost:8004/queryProperties", { params: filteredParams });
      const { entries, total, offset, limit } = response.data;
      setSearchResults(entries);
      setQueryInfo({ total, offset, limit });
    } catch (error) {
      console.error(error);
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
            value={localFormValues.priceMax}
            onChange={handleLocalInputChange}
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
            onChange={handleLocalInputChange}
            className="form-select"
            aria-label="Default select example"
            value={formValues.location}
          >
            <option value="">Anywhere</option>
            <option value="Zurich">Zurich</option>
            <option value="Basel">Basel</option>
            <option value="Geneva">Geneva</option>
            <option value="Lausanne">Lausanne</option>
            <option value="Bern">Bern</option>
            <option value="Lucerne">Lucerne</option>
            <option value="St. Gallen">St. Gallen</option>
            <option value="Biels">Biels</option>
            <option value="Thun">Thun</option>
            <option value="Winterthur">Winterthur</option>
          </select>
        </div>
      </li>

      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Bedrooms</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <select
              name="bedroomMin"
              onChange={handleLocalInputChange}
              className="form-control"
              value={localFormValues.bedroomMin}
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
              onChange={handleLocalInputChange}
              className="form-control"
              value={localFormValues.bedroomMax}
            >
              <option value="">Max</option> { }
              {Array.from({ length: 11 }, (_, index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
            <label htmlFor="floatingInput">Max bedrooms</label>
            {errors.bedroomMax && <div className="text-danger" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.bedroomMax}</div>}
          </div>
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Bathrooms</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <select
              name="bathroomMin"
              onChange={handleLocalInputChange}
              className="form-control"
              value={localFormValues.bathroomMin}
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
              onChange={handleLocalInputChange}
              className="form-control"
              value={localFormValues.bathroomMax}
            >
              <option value="">Max</option> { }
              {Array.from({ length: 11 }, (_, index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
            <label htmlFor="floatingInput">Max bathrooms</label>
            {errors.bathroomMax && <div className="text-danger" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.bathroomMax}</div>}

          </div>
        </div>
      </li>


      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Living Space</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              name="squareMetersMin"
              onChange={handleLocalInputChange}
              type="text"
              className="form-control"
              placeholder="Min"
              defaultValue={localFormValues.squareMetersMin}
            />
            <label htmlFor="floatingInput">Min Surface</label>
          </div>
          <div className="form-floating mb-2">
            <input
              name="squareMetersMin"
              onChange={handleLocalInputChange}
              type="text"
              className="form-control"
              placeholder="Max"
              defaultValue={localFormValues.squareMetersMax}
            />
            <label htmlFor="floatingInput">Max Surface</label>
            {errors.squareMetersMax && <div className="text-danger" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.squareMetersMax}</div>}

          </div>
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Year of construction</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              name="yearBuiltMin"
              onChange={handleLocalInputChange}
              type="text"
              className="form-control"
              placeholder="Min"
              defaultValue={localFormValues.yearBuiltMin}
            />
            <label htmlFor="floatingInput">Min Year</label>
          </div>
          <div className="form-floating mb-2">
            <input
              name="yearBuiltMin"
              onChange={handleLocalInputChange}
              type="text"
              className="form-control"
              placeholder="Max"
              defaultValue={localFormValues.yearBuiltMax}
            />
            <label htmlFor="floatingInput">Max Year</label>
            {errors.yearBuiltMax && <div className="text-danger" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.yearBuiltMax}</div>}

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