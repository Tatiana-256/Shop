import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../store/store";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import {
  loadUser,
  updateProfile,
  userActions,
} from "../../store/actions/userActions";

export const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { error, loading, user, isUpdated } = useSelector(
    (state: AppStateType) => state.user
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (error) {
      alert.error(error);
      dispatch(userActions.clearError(error));
    }
    if (isUpdated) {
      alert.success("The user data is successfully updated");
      dispatch(loadUser());
      history.push("/profile");
      dispatch(userActions.updateProfiledReset());
    }
  }, [dispatch, error, alert, isUpdated, history]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email }));
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow-lg"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          <h1 className="mt-2 mb-5">Update Profile</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn update-btn btn-block mt-4 mb-3"
            disabled={loading}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
