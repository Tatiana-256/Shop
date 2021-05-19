import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./components/Home";
import { ProductDetails } from "./components/Product/ProductDetails";
import { LogIn } from "./components/user/LogIn";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path={`/search/:keyword`} component={Home} />
          <Route exact path={`/`} component={Home} />
          <Route exact path={`/product/:id`} component={ProductDetails} />
          <Route exact path={`/login`} component={LogIn} />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
