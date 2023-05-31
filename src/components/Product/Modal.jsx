import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Modal.css";
import Cards from "./Cards.css";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { bagActionCreator } from "../../ActionCreator/productActionCreator";
import { removeWishActionCreator } from "../../ActionCreator/productActionCreator";

// function closeme(){
//   // alert("close me")
//   var ele = document.getElementById('modalwrapper');
//   ele.style.display = "none";
// }

const Modal = () => {
  const wishlistData = useSelector((storeData) => storeData.productReducer.wishlist);
  const dispatch = useDispatch();
  //  removeFromWishList
  return (
    <>
      <div className="modal-wrapper" id="modalwrapper" >
       <div className="modal">
	   <div className="inner-head">
          <div className="flexed flex-end">Your Wishlist Details </div>
          <div className="right-content">
            {wishlistData.map((value, index) => {
              const { id, pname, product, category, imgscr, price, visible } =
                value;
              var linkto = "/details/" + id;
              return visible ? (
                <div className="container inner-card" key={index}>
                  <div className="card-wrapper">
                    <div className="slider">
                      <NavLink to={linkto}>
                        <img src={imgscr} alt="" className="inner-product-image" />
                      </NavLink>
                      {/* <div className="slide"></div> */}
                      {/* <div class="slide"></div>
                                      <div class="slide"></div> */}
                    </div>
                    <div className="inner-card-info">
                      <h3 className="inner-card-category">{pname}</h3>
                      <p className="inner-card-title">{product}</p>
                      <p className="inner-card-price">{price}</p>
                      <div className="wishlist-wrapper">
                        <button
                          className="wishlist"
                          onClick={() => {
                            let actionCreator = bindActionCreators(bagActionCreator, dispatch);
                            actionCreator(value)
                            alert("Product Added to Bag")
                          }}
                        >

                          Add to Cart
                        </button>


                        <br />
                        <button
                          className="wishlist"
                          onClick={() => {
                            let actionCreator = bindActionCreators(removeWishActionCreator, dispatch);
                            actionCreator(value)
                            alert("Product Removed from Wishlist")
                          }}
                         >
                          Remove from Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
            {/* {JSON.stringify(wishlistData, 3, 3)} */}
          </div>
        </div>
	   </div>
      </div>
    </>
  );
};

export default Modal;
