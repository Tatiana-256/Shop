import { userActionType } from "../actions/userActions";

let initialState: initialStateType = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: "",
  isUpdated: false,
};

// export const productsReducer= (state = initialState, action: productsActionType): initialStateType => {
export const userReducer = (
  state = initialState,
  action: userActionType
): initialStateType => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_USER_REQUEST":
    case "LOAD_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_USER_SUCCESS":
    case "LOAD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case "LOGOUT_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case "LOAD_USER_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "REGISTER_USER_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    case "LOGIN_FAIL":
    case "LOGOUT_USER_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case "UPDATE_PASSWORD_REQUEST":
    case "UPDATE_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
      };

    case "UPDATE_PASSWORD_FAIL":
      return {
        ...state,
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case "UPDATE_PROFILE_RESET":
      return {
        ...state,
        isUpdated: false,
      };
    case "UPDATE_PROFILE_FAIL":
      return {
        ...state,
        loading: false,
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
  loading: boolean;
  isAuthenticated: boolean;
  user: userT | null;
  error: string | null;
  isUpdated: boolean;
};

export type userT = {
  name: string;
  email: string;
  role: string;
  avatar: { url: string };
  createdAt: string;
};

export type registerUserT = {
  name: string;
  email: string;
  password: string;
};
