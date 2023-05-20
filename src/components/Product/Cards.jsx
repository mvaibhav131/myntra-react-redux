import React, { useState } from "react";
import Images from "../Images";
import "../../helper.css";
import Pdata from "./Pdata";
import style from "./Cards.css";
import ProductItem from "./ProductItem";
import Filter from "../Filter/Filter";

const Cards = () => {

  return (

    <>


        {/* FILTERING IS DEFINED */}
        <Filter />

        {/* PRODUCT CARD IS DEFINED HERE */}
        <ProductItem />

    </>

  );
};

export default Cards;
