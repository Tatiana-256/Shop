import { useSelector } from "react-redux";
import { AppStateType } from "../../store/store";
import { Redirect, Route } from "react-router-dom";
import React from "react";

// @ts-ignore
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { error, user, loading, isAuthenticated } = useSelector(
    (state: AppStateType) => state.user
  );
  return (
    <>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              return <Redirect to="/login" />;
            }
            return <Component {...props}/>
          }}
        />
      )}
    </>
  );
};
