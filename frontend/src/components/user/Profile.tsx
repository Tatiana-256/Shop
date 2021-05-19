import { useSelector } from "react-redux";
import { AppStateType } from "../../store/store";
import { Loader } from "../layout/Loader";
import React from "react";
import { MetaData } from "../layout/MetaData";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { error, user, loading } = useSelector(
    (state: AppStateType) => state.user
  );
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Profile" />
          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                  alt={user?.name}
                />
              </figure>
              <Link
                to="/profile/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user?.name}</p>

              <h4>Email Address</h4>
              <p>{user?.email}</p>

              <h4>Joined on </h4>
              <p>{String(user?.createdAt).substring(0, 10)}</p>

              {user?.role !== "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              )}

              <Link
                to="/password/update"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
