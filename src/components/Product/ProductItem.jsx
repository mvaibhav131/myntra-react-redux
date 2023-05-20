import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { productActionCreator } from '../../ActionCreator/productActionCreator';
import { useState, useEffect } from "react";
import { wishActionCreator } from '../../ActionCreator/productActionCreator';

const ProductItem = () => {
    
    const productData = useSelector((storeData) => {
    return storeData.productReducer.shirts;
  });
    const dispatch = useDispatch();
    useEffect(() => {
    let actionCreator = bindActionCreators(productActionCreator, dispatch);
    actionCreator();
  }, []);

    return (
        <>
            <div className="container left-content-border">
                <div className="right-content">
                    {
                        productData.map((value, index) => {
                            const { id, pname, product, category, imgscr, price, visible } = value;
                            var linkto = "/details/"+id;
                            return visible ?
                                (
                                    <div className="cards" key={index}>
                                        <div className="card">
                                            <div className="slider">
                                                <NavLink to={linkto}>
                                                    <img src={imgscr} alt="" className="product-image" />
                                                </NavLink>
                                            </div>
                                            <div className="card-info">
                                                <div className="flexed">
												<div className="card-category">{pname}</div>
												<div className="similar p-r">
												<FontAwesomeIcon icon={faBox} />
												</div>
												</div>
                                                <p className="card-title">{product}</p>
                                                <p className="card-price">{price}</p>
                                                <div className="wishlist-wrapper">
                                                    <button className="wishlist" 
                                                    onClick={() => { 
                                                        let actionCreator = bindActionCreators(wishActionCreator, dispatch);
                                                        actionCreator(value)
                                                        alert("Product Added to Wishlist")
                                                     }}
                                                     > Add to Wishlist </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ProductItem;
