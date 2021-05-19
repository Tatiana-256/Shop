import React from "react";
import { Search } from "./Search";
import { useHistory } from "react-router-dom";

export const Header = () => {
  const history = useHistory();
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
        <button
          className="btn"
          id="login_btn"
          onClick={() => history.push("/login")}
        >
          Login
        </button>

        <span id="cart" className="ml-3">
          Cart
        </span>
        <span className="ml-1" id="cart_count">
          2
        </span>
      </div>
    </nav>
  );
};
