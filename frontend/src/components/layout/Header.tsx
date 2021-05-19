import React, { useEffect } from "react";
import { Search } from "./Search";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../store/store";
import { logOut, userActions } from "../../store/actions/userActions";

export const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();

  const { error, loading, user } = useSelector(
    (state: AppStateType) => state.user
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(userActions.clearError(error));
    }
  }, [dispatch, error, alert]);

  const logOutHandler = () => {
    debugger;
    dispatch(logOut());
    alert.success("Log out successfully");
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand" onClick={() => history.push("/")}>
          <img src="./images/logo.png" />
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/card">
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </Link>
        {user ? (
          <div className="ml-4 dropdown d-inline mr-5">
            <Link
              to="/#!"
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expended="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                  className="rounded-circle"
                  alt={user && user.name}
                />
              </figure>
              <span>{user && user.name}</span>
            </Link>
            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
              {user && user.role !== "admin" ? (
                <Link className="dropdown-item" to="/orders/me">
                  {" "}
                  Orders
                </Link>
              ) : (
                <Link className="dropdown-item" to="/dashboard">
                  Dashboard
                </Link>
              )}
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
              <Link
                className="dropdown-item text-danger"
                to="/"
                onClick={logOutHandler}
              >
                {" "}
                LogOut
              </Link>
            </div>
          </div>
        ) : (
          !loading && (
            <button
              className="btn"
              id="login_btn"
              onClick={() => history.push("/login")}
            >
              Login
            </button>
          )
        )}
      </div>
    </nav>
  );
};
