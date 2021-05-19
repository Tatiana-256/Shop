import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./components/Home";
import { ProductDetails } from "./components/Product/ProductDetails";
import { LogIn } from "./components/user/LogIn";
import { Register } from "./components/user/Register";
import { useDispatch } from "react-redux";
import { loadUser } from "./store/actions/userActions";
import { Profile } from "./components/user/Profile";
import { ProtectedRoute } from "./components/route/protectedRoute";
import { UpdateProfile } from "./components/user/UpdateProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path={`/search/:keyword`} component={Home} />
          <Route exact path={`/`} component={Home} />
          <Route exact path={`/product/:id`} component={ProductDetails} />
          <Route exact path={`/login`} component={LogIn} />
          <Route exact path={`/register`} component={Register} />
          <Route exact path={`/profile`} component={Profile} />
          <Route exact path={`/profile/update`} component={UpdateProfile} />
          <ProtectedRoute path="/profile" component={Profile} exact />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
