import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { MetaData } from "./layout/MetaData";
import { getProducts } from "../store/actions/productsActions";
import { AppStateType } from "../store/store";
import { Product } from "./Product/Product";
import { Loader } from "./layout/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

interface MatchParams {
  keyword: string;
}

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export const Home = ({ match }: RouteComponentProps<MatchParams>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Home",
    "Another",
    "Cameras",
  ];

  const {
    loading,
    productsCount,
    error,
    products,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state: AppStateType) => state.products);

  const alert = useAlert();
  const dispatch = useDispatch();

  const keyWord = match.params.keyword;

  useEffect(() => {
    debugger;
    dispatch(getProducts(keyWord, currentPage, price, category, rating));

    if (error) {
      alert.error(error);
    }
  }, [dispatch, alert, error, currentPage, keyWord, price, category, rating]);

  if (loading) {
    return <Loader />;
  }

  const setCurrentPageNo = (page: number) => {
    setCurrentPage(page);
  };

  let count = productsCount;
  if (keyWord) {
    count = filteredProductsCount;
  }

  return (
    <>
      <MetaData title={"Buy the best products online"} />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {keyWord ? (
            <>
              <div className="col-6 col-md-3 mt-5 mb-5">
                <div className="px-5">
                  <Range
                    marks={{
                      1: `$1`,
                      1000: `1000`,
                    }}
                    min={1}
                    max={1000}
                    defaultValue={[1, 1000]}
                    tipFormatter={(value) => `$${value}`}
                    tipProps={{
                      placement: "top",
                      visible: true,
                    }}
                    value={price}
                    onChange={(price) => setPrice(price)}
                  />
                  <hr className="my-5" />
                  <div className="mt-5">
                    <h4 className="md-3">Categories</h4>
                    {categories.map((category) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </div>
                  <div className="mt-3">
                    <h4 className="md-3">Ratings</h4>
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={star}
                        onClick={() => setRating(star)}
                      >
                        <div className="rating-outer">
                          <div className="rating-inner" style={{
                            width: `${star * 20}%`
                          }}/>
                        </div>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-9">
                <div className="row">
                    {products.map((product) => (
                      <Product key={product._id} product={product} col={4} />
                    ))}
                </div>
              </div>
            </>
          ) : (
            products.map((product) => (
              <Product key={product._id} product={product} col={3} />
            ))
          )}
        </div>
      </section>
      <div className="d-flex justify-content-center mt-5">
        {resPerPage <= count && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
          />
        )}
      </div>
    </>
  );
};
