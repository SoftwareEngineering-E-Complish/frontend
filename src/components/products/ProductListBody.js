import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from "../../products/Product";
import ProductH from "../../products/ProductH";
import { useState } from "react";
import { useSearch } from '../../SearchContext';

function ProductListBody({ products }) {
    const {handleInputChange} = useSearch();
    const [viewType, setViewType] = useState({ grid: true });

    function changeViewType() {
        setViewType({
            grid: !viewType.grid,
        });
    }

    if (!products || products.length == 0) return <div className="spinner text-center">No properties found</div>;
    return (
        <div className="d-flex flex-column h-100">
            <div className="row mb-3">
                <div className="col-lg-3 d-none d-lg-block">
                <select
                name="order"
                className="form-select"
                aria-label="Default select example"
                defaultValue=""
                onChange={handleInputChange}
                >
                <option value="">Select order</option> {/* Assuming you want a placeholder option */}
                <option value="price_asc">Price (lowest first)</option>
                <option value="price_desc">Price (highest first)</option>
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
                <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search products..."
                            aria-label="search input"
                        />
                        <button className="btn btn-outline-dark">
                            <FontAwesomeIcon icon={["fas", "search"]} />
                        </button>
                    </div>
                    <button
                        className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                        onClick={changeViewType}
                    >
                        <FontAwesomeIcon
                            icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                        />
                    </button>
                </div>
            </div>
            <div
                className={
                    "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                    (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
                }
            >
                {products.map((product, i) => {
                    if (viewType.grid) {
                        return (
                            <Product key={product.propertyId} product={product} />
                        );
                    }
                    return (
                        <ProductH key={product.propertyId} product={product} />
                    );
                })}
            </div>

            <div className="d-flex align-items-center mt-auto">
                <span className="text-muted small d-none d-md-inline">
                    Showing 10 of 100
                </span>
                <nav aria-label="Page navigation example" className="ms-auto">
                    <ul className="pagination my-0">
                        <li className="page-item">
                            <a className="page-link" href="!#">
                                Previous
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="!#">
                                1
                            </a>
                        </li>
                        <li className="page-item active">
                            <a className="page-link" href="!#">
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="!#">
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="!#">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default ProductListBody;