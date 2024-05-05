import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from "../../products/Product";
import ProductH from "../../products/ProductH";
import { useSearch } from '../../SearchContext';
import axiosInstance from '../../api/axiosInstance';
import mapFormValuesToQueryParams from '../helpers/mapFormValuesToQueryParams';
import MapView from '../map/Map';



function ProductResultsBody({ properties }) {
    const { handleInputChange, queryInfo, setSearchResults, setQueryInfo, formValues, handleApplyFilters } = useSearch();
    const [viewType, setViewType] = useState({ grid: true });
    const [showMapView, setShowMapView] = useState(false);
    const currentPage = queryInfo.offset / queryInfo.limit + 1;
    const totalPages = Math.ceil(queryInfo.total / queryInfo.limit);

    const handleChangePage = async (newOffset) => {
        const queryParams = mapFormValuesToQueryParams(formValues);
        queryParams.offset = newOffset;
        try {
            const response = await axiosInstance.get("http://localhost/api/queryProperties", {
                params: queryParams
            });
            const { entries, total, offset, limit } = response.data;
            setSearchResults(entries);
            setQueryInfo({ total, offset, limit });
        } catch (error) {

        }
    };

    function changeViewType() {
        setShowMapView(false);
        setViewType({
            grid: !viewType.grid,
        });
    }

    if (!properties || properties.length == 0) return <div className="spinner text-center">No properties found</div>;
    return (
        <div className="d-flex flex-column h-100">
            <div className="row mb-3">
                <div className="col-lg-3 d-none d-lg-block">
                    <select
                        name="order"
                        className="form-select"
                        aria-label="Default select example"
                        defaultValue=""
                        onChange={(event) => {
                            handleInputChange(event)
                            handleApplyFilters()
                        }}
                    >
                        <option value="">Select order</option> {/* Assuming you want a placeholder option */}
                        <option value="price-asc">Price (lowest first)</option>
                        <option value="price-desc">Price (highest first)</option>
                        <option value="square-meters-asc">Surface (lowest first)</option>
                        <option value="square-meters-desc">Surface (highest first)</option>
                        <option value="year-built-asc">Year (lowest first)</option>
                        <option value="year-built-desc">Year (highest first)</option>
                        <option value="bathrooms-asc">Number of bathrooms (lowest first)</option>
                        <option value="bathrooms-desc">Number of bathrooms (highest first)</option>
                        <option value="bedrooms-asc">Number of bedrooms (lowest first)</option>
                        <option value="bedrooms-desc">Number of bedrooms (highest first)</option>
                    </select>

                </div>
                <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row justify-content-end">
                    {/* <div className="input-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search properties..."
                            aria-label="search input"
                        />
                        <button className="btn btn-outline-dark">
                            <FontAwesomeIcon icon={["fas", "search"]} />
                        </button>
                    </div> */}
                    <button
                        className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                        onClick={changeViewType}
                    >
                        <FontAwesomeIcon
                            icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                        />
                    </button>
                    <button className="btn btn-outline-dark ms-2 d-none d-lg-inline" onClick={() => setShowMapView(!showMapView)}>
                        <FontAwesomeIcon icon="fa-regular fa-map" />
                    </button>
                </div>
            </div>
            {showMapView ? (<div className={"g-3 mb-4 flex-shrink-0"}>
                <MapView properties={properties} />
            </div>)
                :
                (<div
                    className={
                        "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                        (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
                    }
                >
                    {properties.map((property, i) => {
                        if (viewType.grid) {
                            return (
                                <Product key={property.propertyId} product={property} ownProperty={true} />
                            );
                        }
                        return (
                            <ProductH key={property.propertyId} product={property} />
                        );
                    })}
                </div>)
            }
            <div className="d-flex align-items-center mt-auto">
                <span className="text-muted small d-none d-md-inline">
                    Showing {Math.min(queryInfo.limit + queryInfo.offset, queryInfo.total)} of {queryInfo.total}
                </span>
                <nav aria-label="Page navigation example" className="ms-auto">
                    <ul className="pagination my-0">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => currentPage > 1 && handleChangePage(queryInfo.offset - queryInfo.limit)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        {[...Array(totalPages).keys()].map(pageNumber => (
                            <li key={pageNumber} className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}>
                                <button
                                    className="page-link"
                                //onClick={handleGetNext}
                                >
                                    {pageNumber + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => currentPage < totalPages && handleChangePage(queryInfo.offset + queryInfo.limit)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div >
    );
}

export default ProductResultsBody;
