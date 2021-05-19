import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import {
  getProductDetails,
  productDetailsActions,
} from "../../store/actions/productDetailsActions";
import { AppStateType } from "../../store/store";
import { Loader } from "../layout/Loader";
import { useAlert } from "react-alert";
import { MetaData } from "../layout/MetaData";
import { logIn, userActions } from "../../store/actions/userActions";

export const LogIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { error, isAuthenticated, loading } = useSelector(
    (state: AppStateType) => state.user
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (error) {
      alert.error(error);
      dispatch(userActions.clearError(error));
    }
  }, [dispatch, error, isAuthenticated, alert]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logIn(email, password));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="LogIn" />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
