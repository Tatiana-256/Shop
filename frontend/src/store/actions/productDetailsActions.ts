import axios from "axios";
import { productT } from "../reducers/productsReducer";
import { baseThunkType, InferActionsTypes } from "../store";
import { productsActions, productsActionType } from "./productsActions";

export const productDetailsActions = {
  getProductRequest: () => ({ type: "PRODUCT_DETAILS_REQUEST" } as const),
  getProductSuccess: (payload: productT) =>
    ({
      type: "PRODUCT_DETAILS_SUCCESS",
      payload,
    } as const),
  getProductFail: (payload: string) =>
    ({ type: "PRODUCT_DETAILS_FAIL", payload } as const),
  clearError: () => ({ type: "CLEAR_ERRORS" } as const),
};

// ____________________TYPES FOR ACTION CREATORS__________________

export type productActionType = InferActionsTypes<typeof productDetailsActions>;

// ___________thunk-creators_____________

type thunkType = baseThunkType<productActionType>;

export const getProductDetails = (id: string): thunkType => async (
  dispatch
) => {
  try {
    dispatch(productDetailsActions.getProductRequest());
    const { data } = await axios.get<any>(`/api/v1/product/${id}`);
    dispatch(productDetailsActions.getProductSuccess(data.product));
  } catch (error) {
    dispatch(productDetailsActions.getProductFail(error.response.data.message));
  }
};
