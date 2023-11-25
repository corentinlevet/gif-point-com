import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Router from "../Router/Router";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLogged, setIsLogged] = useState(parseInt(localStorage.getItem("isLogged") || 0));

  return (
    isLogged ? (
      <BrowserRouter>
        <Navbar />
        <Router />
      </BrowserRouter>
    ) : (
      <Login setIsLogged={setIsLogged} />
    )
  );
}

export default App;
