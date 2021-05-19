import axios from "axios";
import { baseThunkType, InferActionsTypes } from "../store";
import { productT } from "../reducers/productsReducer";
import { userT } from "../reducers/userReduser";

// ____________________TYPES FOR ACTION CREATORS__________________

export const userActions = {
  loginRequest: () => ({ type: "LOGIN_REQUEST" } as const),
  loginSuccess: (payload: userT) =>
    ({
      type: "LOGIN_SUCCESS",
      payload,
    } as const),
  loginFail: (payload: string) => ({ type: "LOGIN_FAIL", payload } as const),

  registerUserRequest: () => ({ type: "REGISTER_USER_REQUEST" } as const),
  registerUserSuccess: (payload: userT) =>
    ({ type: "REGISTER_USER_SUCCESS", payload } as const),
  registerUserFail: (payload: string) =>
    ({ type: "REGISTER_USER_FAIL", payload } as const),

  clearError: (payload: string) => ({ type: "CLEAR_ERRORS", payload } as const),
};

export type userActionType = InferActionsTypes<typeof userActions>;

// ___________thunk-creators_____________

type thunkType = baseThunkType<userActionType>;

export const logIn = (email: string, password: string): thunkType => async (
  dispatch
) => {
  try {
    dispatch(userActions.loginRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );
    dispatch(userActions.loginSuccess(data.user));
  } catch (error) {
    dispatch(userActions.loginFail(error.response.data.message));
  }
};

export const registerUser = (userData: any): thunkType => async (dispatch) => {
  try {
    dispatch(userActions.registerUserRequest());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/api/v1/register", userData, config);
    dispatch(userActions.registerUserSuccess(data.user));
  } catch (error) {
    dispatch(userActions.registerUserFail(error.response.data.message));
  }
};
