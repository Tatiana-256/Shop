import axios from "axios";
import { baseThunkType, InferActionsTypes } from "../store";
import { registerUserT, userT } from "../reducers/userReduser";

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

  loadUserRequest: () => ({ type: "LOAD_USER_REQUEST" } as const),
  loadUserSuccess: (payload: userT) =>
    ({ type: "LOAD_USER_SUCCESS", payload } as const),
  loadUserFail: (payload: string) =>
    ({ type: "LOAD_USER_FAIL", payload } as const),

  //update the password
  updatePasswordRequest: () => ({ type: "UPDATE_PASSWORD_REQUEST" } as const),
  updatePasswordSuccess: () => ({ type: "UPDATE_PASSWORD_SUCCESS" } as const),
  updatePasswordFail: () => ({ type: "UPDATE_PASSWORD_FAIL" } as const),

  // update the profile
  updateProfiledRequest: () => ({ type: "UPDATE_PROFILE_REQUEST" } as const),
  updateProfileSuccess: (payload: any) =>
    ({ type: "UPDATE_PROFILE_SUCCESS", payload } as const),
  updateProfiledReset: () => ({ type: "UPDATE_PROFILE_RESET" } as const),
  updateProfileFail: (payload: string) =>
    ({ type: "UPDATE_PROFILE_FAIL", payload } as const),

  logOutSuccess: () => ({ type: "LOGOUT_USER_SUCCESS" } as const),
  logOutFail: (payload: string) =>
    ({ type: "LOGOUT_USER_FAIL", payload } as const),

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

export const registerUser = (userData: registerUserT): thunkType => async (
  dispatch
) => {
  try {
    dispatch(userActions.registerUserRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/register", userData, config);
    dispatch(userActions.registerUserSuccess(data.user));
  } catch (error) {
    dispatch(userActions.registerUserFail(error.response.data.error.message));
  }
};

export const loadUser = (): thunkType => async (dispatch) => {
  try {
    dispatch(userActions.loadUserRequest());
    const { data } = await axios.get(`/api/v1/profile`);
    dispatch(userActions.loadUserSuccess(data.user));
  } catch (error) {
    dispatch(userActions.loadUserFail(error.response.data.error.message));
  }
};

export const logOut = (): thunkType => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch(userActions.logOutSuccess());
  } catch (error) {
    dispatch(userActions.logOutFail(error.response.data.error.message));
  }
};

export const updateProfile = (userData: any): thunkType => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch(userActions.updateProfiledRequest());
    const { data } = await axios.put(
      `/api/v1/profile/update`,
      userData,
      config
    );
    dispatch(userActions.updateProfileSuccess(data.success));
  } catch (error) {
    dispatch(userActions.updateProfileFail(error.response.data.error.message));
  }
};
