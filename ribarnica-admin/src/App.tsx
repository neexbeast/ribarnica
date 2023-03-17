import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Naruci from "./Pages/Naruci/Naruci";
import Narudzbe from "./Pages/Narudzbe/Narudzbe";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/naruci" element={<Naruci />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/narudzbe" element={<Narudzbe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
