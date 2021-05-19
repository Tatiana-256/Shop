import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  registerUser,
  userActions,
} from "../../store/actions/userActions";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppStateType } from "../../store/store";
import { Loader } from "../layout/Loader";
import { MetaData } from "../layout/MetaData";

export const Register = () => {
  const { error, isAuthenticated, loading } = useSelector(
    (state: AppStateType) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { email, password, name } = user;

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
    debugger;
    dispatch(registerUser(user));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Register" />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form
                className="shadow-lg"
                encType="multipart/form-data"
                onSubmit={submitHandler}
              >
                <h1 className="mb-3">Register</h1>

                <div className="form-group">
                  <label htmlFor="email_field">Name</label>
                  <input
                    type="name"
                    name="name"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={onInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={onInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={onInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="avatar_upload">Avatar</label>
                  <div className="d-flex align-items-center">
                    <div>
                      <figure className="avatar mr-3 item-rtl">
                        <img src="" className="rounded-circle" alt="image" />
                      </figure>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="avatar"
                        className="custom-file-input"
                        id="customFile"
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  id="register_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={
                    name === "" || password === "" || email === "" || loading
                  }
                >
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
