import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Router from "../Router/Router";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div>
    {
      isLogged ? (
        <BrowserRouter>
          <Navbar />
          <Router />
        </BrowserRouter>
      ) : (
        <Login setIsLogged={setIsLogged} />
      )
    }
    </div>
  );
}

export default App;
