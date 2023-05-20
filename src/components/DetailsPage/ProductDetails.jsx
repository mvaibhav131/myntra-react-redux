import React, { useState } from "react";
import Style from "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { bagActionCreator } from "../../ActionCreator/productActionCreator";
import { wishActionCreator } from "../../ActionCreator/productActionCreator";

const ProductDetails = (props) => {
  const wishlistData = useSelector((storeData) => storeData.productReducer.wishlist);
  const dispatch = useDispatch();
  const[selSize, setSelSize]= useState(null);
  const selectSize=(value)=>{
   console.log(value)
  }
  return (
    <>
      <div className="right-details-content">
        <h2
          className="productName"
          style={{
            "text-transform": "uppercase",
            letterSpacing: "2px",
            margin: "5px 0",
          }}
        >
          {props.productName}
        </h2>
        <p
          className="productType"
          style={{
            "text-transform": "capitalize",
            opacity: "0.4",
            fontSize: "24px",
          }}
        >
          {props.productType}
        </p>
        <hr
          style={{
            width: "50%",
            transform: "translateX(-50%)",
            marginTop: "25px",
          }}
        />
        <p>{props.productDescription}</p>
        <h2 className="productPrice" style={{ "text-transform": "capitalize" }}>
          {props.productPrice}/-
        </h2>
        {
          // console.log(props.size)
          props.size.map((value) => {
            return <p className="size-varient" onClick={selectSize(value)}>{value}</p>;
          })
        }
        <br />
        <br />
        <button
          className="details-btn btn-primary"
          onClick={() => {
            //dispatch(addToCart(props.value));
            let actionCreator = bindActionCreators(bagActionCreator, dispatch);
            actionCreator(props.value)
            alert("Product Added to Bag")
            console.log(props.value)
          }}
        >
          Add to Bag
        </button>

        <button
          className="details-btn btn-sec"
          onClick={() => {
            let actionCreator = bindActionCreators(wishActionCreator, dispatch);
            actionCreator(props.value)
            alert("Product Added to Wishlist")
          }}
        >
          Wishlist
        </button>
      </div>
    </>
  );
};

export default ProductDetails;
