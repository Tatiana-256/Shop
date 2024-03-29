import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import {
  getProductDetails,
  productDetailsActions,
} from "../../store/actions/productDetailsActions";
import { AppStateType } from "../../store/store";
import { Loader } from "../layout/Loader";
import { useAlert } from "react-alert";
import { MetaData } from "../layout/MetaData";

interface MatchParams {
  id: string;
}

export const ProductDetails = ({ match }: RouteComponentProps<MatchParams>) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, product } = useSelector(
    (state: AppStateType) => state.product
  );

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    if (error) {
      alert.error(error);
      productDetailsActions.clearError();
    }
  }, [dispatch, error, alert, match.params.id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <MetaData title={product?.name} />
      <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <Carousel pause="hover">
            {product?.images &&
              product.images.map((image) => (
                <Carousel.Item key={image.public_id}>
                  <img
                    src={image.url}
                    alt={product.name}
                    className="d-block w-100"
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product?.name}</h3>
          <p id="product_id">Product # {product?._id}</p>

          <hr />
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{
                width: `${product?.ratings && (product?.ratings / 5) * 100}% `,
              }}
            />
          </div>
          <span id="no_of_reviews">({product?.numOfReviews} Reviews)</span>

          <hr />
          <p id="product_price">${product?.price}</p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus">-</span>

            <input
              type="number"
              className="form-control count d-inline"
              value="1"
              readOnly
            />

            <span className="btn btn-primary plus">+</span>
          </div>
          <button
            type="button"
            id="cart_btn"
            className="btn btn-primary d-inline ml-4"
          >
            Add to Cart
          </button>

          <hr />
          <p>
            Status:{" "}
            <span
              id="stock_status"
              className={
                product?.stock && product.stock > 0 ? "greenColor" : "redColor"
              }
            >
              {product?.stock && product.stock > 0
                ? "In Stock"
                : "Out of stock"}
            </span>
          </p>

          <hr />
          <h4 className="mt-2">Description:</h4>
          <p>{product?.description} </p>
          <hr />
          <p id="product_seller mb-3">
            Sold by: <strong>{product?.seller}</strong>
          </p>

          <button
            id="review_btn"
            type="button"
            className="btn btn-primary mt-4"
            data-toggle="modal"
            data-target="#ratingModal"
          >
            Submit Your Review
          </button>

          <div className="row mt-2 mb-5">
            <div className="rating w-50">
              <div
                className="modal fade"
                id="ratingModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="ratingModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="ratingModalLabel">
                        Submit Review
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <ul className="stars">
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                      </ul>

                      <textarea
                        name="review"
                        id="review"
                        className="form-control mt-3"
                      />
                      <button
                        className="btn my-3 float-right review-btn px-4 text-white"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
