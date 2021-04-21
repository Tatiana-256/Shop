import axios from "axios";
import { productT } from "../reducers/productsReducer";
import { baseThunkType, InferActionsTypes } from "../store";

export const productsActions = {
  getProductsRequest: () => ({ type: "ALL_PRODUCTS_REQUEST" } as const),
  getProductsSuccess: (payload: {
    products: productT[];
    productCount: number;
    resPerPage: number;
  }) =>
    ({
      type: "ALL_PRODUCTS_SUCCESS",
      payload,
    } as const),
  getProductsFail: (payload: string) =>
    ({ type: "ALL_PRODUCTS_FAIL", payload } as const),
  clearError: () => ({ type: "CLEAR_ERRORS" } as const),
};

// ____________________TYPES FOR ACTION CREATORS__________________

export type productsActionType = InferActionsTypes<typeof productsActions>;

// ___________thunk-creators_____________

type thunkType = baseThunkType<productsActionType>;

export const getProducts = (keyWord = "", page = 1): thunkType => async (
  dispatch
) => {
  try {
    debugger;
    dispatch(productsActions.getProductsRequest());
    const { data } = await axios.get<any>(
      `/api/v1/products?keyword=${keyWord}&page=${page}`
    );
    dispatch(productsActions.getProductsSuccess(data));
  } catch (error) {
    dispatch(productsActions.getProductsFail(error.response.data.message));
  }
};
