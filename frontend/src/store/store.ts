import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer } from "./reducers/productsReducer";
import { productDetailsReducer } from "./reducers/productDetailsReducer";

const reducers = combineReducers({
  products: productsReducer,
  product: productDetailsReducer,
});

const moddleware = [thunk];

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...moddleware))
);

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesType<T>>;

export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;
