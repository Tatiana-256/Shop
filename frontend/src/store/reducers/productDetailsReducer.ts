import { productT } from "./productsReducer";
import { productActionType } from "../actions/productDetailsActions";

let initialState: initialStateType = {
  product: null,
  loading: false,
  error: null,
};

export const productDetailsReducer = (
  state = initialState,
  action: productActionType
): initialStateType => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "PRODUCT_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case "PRODUCT_DETAILS_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

type initialStateType = {
  product: productT | null;
  loading: boolean;
  error: string | null;
};
