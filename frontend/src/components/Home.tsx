import { MetaData } from "./layout/MetaData";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions/productsActions";
import { AppStateType } from "../store/store";
import { Product } from "./Product/Product";
import { Loader } from "./layout/Loader";
import { useAlert } from "react-alert";
import { Route, RouteComponentProps } from "react-router-dom";
import Pagination from "react-js-pagination";

interface MatchParams {
  keyword: string;
}

export const Home = ({ match }: RouteComponentProps<MatchParams>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, productsCount, error, products, resPerPage } = useSelector(
    (state: AppStateType) => state.products
  );

  const alert = useAlert();
  const dispatch = useDispatch();

  const keyWord = match.params.keyword;

  useEffect(() => {
    debugger;
    dispatch(getProducts(keyWord, currentPage));

    if (error) {
      alert.error(error);
    }
  }, [dispatch, alert, error, currentPage, keyWord]);

  if (loading) {
    return <Loader />;
  }

  const setCurrentPageNo = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <MetaData title={"Buy the best products online"} />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </section>
      <div className="d-flex justify-content-center mt-5">
        {resPerPage <= productsCount && (
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
