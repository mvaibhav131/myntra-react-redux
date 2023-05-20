import React, { useState } from "react";
import Images from "../Images";
import './Navbar.css';
import myntraLogo from "../Myntra.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faSearch, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import Modal from "../Product/Modal"
import Cart from "../Product/Cart";
import { NavLink } from "react-router-dom";
import { searchActionCreator } from "../../ActionCreator/productActionCreator";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const menu = ["Mens", "Womens", "Kids", "Home & Living", "Offer"];

const Navbar = () => {
	const [showWishlist, setShowWishlist] = useState(false)
	const [showCart, setShowCart] = useState(false)
	const [searchInput,setSearchInput]=useState("")
	const dispatch = useDispatch();

	const wishlistData = useSelector((storeData) =>{
		return storeData.productReducer.wishlist
	})
	const cartData = useSelector((storeData) => {
		return storeData.productReducer.cart
	})

	const searchOnKeyPress=(e)=>{
		if(e.key=="Enter"){
           let actionCreator = bindActionCreators(searchActionCreator, dispatch);
            actionCreator(searchInput)
		}
	}

	
	return (
		<>
			<div className="nav">
				<input type="checkbox" id="nav-check" />
				<div className="nav-header">
					<div className="nav-title">
						<NavLink to="/"><img src={myntraLogo} alt="logo" height="50px" /></NavLink>
					</div>
				</div>
				<div className="nav-btn">
					<label htmlFor="nav-check">
						<span></span>
						<span></span>
						<span></span>
					</label>
				</div>
				<div className="nav-links">
					<div className="flexed">
						{
							menu.map(item => (
								<div className="inner-content" key={item}>
									<p>{item}</p>
								</div>
							))
						}

					</div>
				</div>
				<div className="nav-search">
					<div className="border">
						<FontAwesomeIcon icon={faSearch} className="font-color" />
						<input className="padding	" type="search" placeholder="Search for Products, brands and more..." 
						onChange={(e)=>{setSearchInput(e.target.value)}}
						onKeyPress={searchOnKeyPress}
						/> 			
						</div>
				</div>
				<div className="user-profile">
					<div className="flexed">
						{/* Profile */}
						<div className="p-r-10">
							<FontAwesomeIcon icon={faUser} className="font-color" />
							<p>PROFILE</p>
						</div>

						{/* Whishlist */}
						<div className="p-r-10" onClick={() => {setShowWishlist(!showWishlist)}}>
							<FontAwesomeIcon icon={faHeart} className="font-color" />
							<div>WISHLIST {`${wishlistData?.length > 0 ? wishlistData.length: ''}`}</div>
						</div>

						{/* Cart */}
						<div className="p-r-10" onClick={() => {setShowCart(!showCart)}}>
							<FontAwesomeIcon icon={faBagShopping} className="font-color" />
							<div >BAG {`${cartData?.length > 0 ? cartData.length: ''}`} </div>
						</div>
					</div>
				</div>
				{
			showWishlist && <Modal/>
		}
		{
			showCart && <Cart />
		}
			</div>
		</>
	)
}

export default Navbar;
