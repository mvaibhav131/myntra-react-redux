import React, { useState, useEffect } from "react";
import Breadcrums from "./Breadcrums";
import "./Details.css";
import Style from "../../helper.css"
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import { useParams } from "react-router-dom";
import { productActionCreator } from "../../ActionCreator/productActionCreator";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

const Details = () => {
  const dispatch = useDispatch();
  const { detailslug } = useParams();
  console.log(detailslug);
  const Pdata = useSelector((storeData) => {
    return storeData.productReducer.shirts;
  });
  console.log(Pdata)
  const value = Pdata.filter((item)=> item.id == detailslug)[0]
  console.log(value)
  var BreadcrumsTitle = "Home / Shirt / " +  detailslug

  return (
    <>
     
      <Breadcrums title={BreadcrumsTitle} />
      <div className="container">
        <div className="details-outer-wrapper">
          
        <ProductImages key={1} imgMain={value.imgscr} img2={value.img2} img3={value.img3} img4={value.img4} />

        <ProductDetails productDescription={value.description} productType={value.product} productName={value.pname} productPrice={value.price} size={value.size} value={value} />
                  
        </div>
      </div>
    </>
  );
};

export default Details;
