import React from "react";
import "./App.css";
import Cards from "./components/Product/Cards";
import Pdata from "./components/Product/Pdata";
import Navbar from "./components/Navbar/Navbar.jsx";
import Filter from "./components/Filter/Filter.jsx";
import Sort from "./components/Sort/Sort.jsx";
import { Route, Routes } from "react-router-dom";
import Details from "./components/DetailsPage/Details";
import HomePage from "./components/Product/HomePage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:detailslug" element={<Details/>} />
      </Routes>

    </>
  );
};

export default App;
