import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Modal.css";
import "./Cards.css";
import { removeBagActionCreator } from "../../ActionCreator/productActionCreator";
import { bindActionCreators } from "redux";

const Cart = () => {
	const cartData = useSelector(storeData => storeData.productReducer.cart)
	console.log(cartData)
	const dispatch = useDispatch();
	
	return (
		<>
			<div className="modal-wrapper">
				<div className="inner-head">
					<div className="flexed flex-end">Your Bag Details</div>
					<div className="right-content">
						{cartData.map((value, index) => {
							const { id, pname, product, category, imgscr, price, visible } =
								value;
							return visible ? (
								<div className="inner-card container" key={index}>
									<div className="card-wrapper">
										<div className="slider">
											<img src={imgscr} alt="" className="product-image" />
										</div>
										<div className="card-info">
											<h3 className="inner-card-category">{pname}</h3>
											<p className="inner-card-title">{product}</p>
											<p className="inner-card-price">{price}</p>
											<div className="wishlist-wrapper">
												
												<button
													className="wishlist"
													onClick={() => {
														let actionCreator = bindActionCreators(removeBagActionCreator, dispatch);
                                                        actionCreator(value)
                                                        alert("Product Removed from Bag")
													}}
												>
													Remove from Bag
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
		</>
	)
}
export default Cart;
