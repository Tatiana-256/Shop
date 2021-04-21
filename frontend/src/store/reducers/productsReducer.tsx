import { productsActionType } from "../actions/productsActions";

let initialState: initialStateType = {
  products: [],
  productsCount: 0,
  resPerPage: 8,
  loading: false,
  error: null,
};

// export const productsReducer= (state = initialState, action: productsActionType): initialStateType => {
export const productsReducer = (
  state = initialState,
  action: productsActionType
): initialStateType => {
  switch (action.type) {
    case "ALL_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ALL_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productCount,
        resPerPage: action.payload.resPerPage,
      };
    case "ALL_PRODUCTS_FAIL":
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
  products: productT[];
  loading: boolean;
  resPerPage: number;
  productsCount: number;
  error: string | null;
};

export type productT = {
  price: number;
  ratings: number;
  stock: number;
  numOfReviews: number;
  _id: string;
  name: string;
  description: string;
  images: {
    _id: string;
    public_id: string;
    url: string;
  }[];
  category: string;
  seller: string;
  reviews: any[];
  createdAt: string;
};
