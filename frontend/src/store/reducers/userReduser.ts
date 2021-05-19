import { userActionType } from "../actions/userActions";

let initialState: initialStateType = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: "",
};

// export const productsReducer= (state = initialState, action: productsActionType): initialStateType => {
export const userReducer = (
  state = initialState,
  action: userActionType
): initialStateType => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGIN_FAIL":
    case "REGISTER_USER_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
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
};

export type userT = {
  name: string;
  role: string;
  avatar: { url: string };
  createdAt: string;
};
