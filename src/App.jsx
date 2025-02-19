import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
