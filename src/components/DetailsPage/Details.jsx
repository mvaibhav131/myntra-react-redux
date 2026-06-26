import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaStar, FaShoppingBag, FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";
import { toast } from "react-toastify";
import { loadProductsActionCreator, addToCartAction, toggleWishlistAction } from "../../ActionCreator/productActionCreator";
import "./Details.css";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts, wishlist } = useSelector((s) => s.productReducer);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImg, setMainImg] = useState(0);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => { dispatch(loadProductsActionCreator()); }, [dispatch]);
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const product = allProducts.find((p) => p.id === Number(id));
  const isWishlisted = wishlist.some((w) => w.id === Number(id));

  if (!product) {
    return <div className="spinner-wrapper" style={{ minHeight: "60vh" }}><div className="spinner" /></div>;
  }

  const { brand, name, price, mrp, discount, rating, ratingCount, sizes, images, description } = product;
  const allImages = images && images.length > 0 ? images : [product.image];

  const handleAddToBag = () => {
    if (!selectedSize) { setSizeError(true); toast.error("Please select a size first!"); return; }
    dispatch(addToCartAction(product, selectedSize));
    toast.success("Added to Bag!", { icon: false });
  };

  const handleWishlist = () => {
    dispatch(toggleWishlistAction(product));
    toast.success(isWishlisted ? "Removed from Wishlist" : "Wishlisted!", { icon: false });
  };

  const handleBuyNow = () => {
    if (!selectedSize) { setSizeError(true); toast.error("Please select a size first!"); return; }
    dispatch(addToCartAction(product, selectedSize));
    navigate("/checkout");
  };

  const similar = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6);

  return (
    <div className="details-page">
      <div className="details-container">
        <div className="details-breadcrumb">
          <Link to="/">Home</Link>&nbsp;&rsaquo;&nbsp;
          <Link to={`/products/${product.gender}`}>{product.gender}</Link>&nbsp;&rsaquo;&nbsp;
          <span>{name}</span>
        </div>

        <div className="details-layout">
          <div className="details-gallery">
            <div className="gallery-thumbs">
              {allImages.map((img, i) => (
                <button key={i} className={"thumb-btn" + (mainImg === i ? " active" : "")} onClick={() => setMainImg(i)}>
                  <img src={img} alt={name + " " + (i + 1)} onError={(e) => { e.target.src = "https://picsum.photos/seed/t" + i + "/80/100"; }} />
                </button>
              ))}
            </div>
            <div className="gallery-main">
              <img src={allImages[mainImg]} alt={name} className="main-image" onError={(e) => { e.target.src = "https://picsum.photos/seed/detail/500/650"; }} />
              {discount >= 20 && <div className="gallery-discount-badge">{discount}% OFF</div>}
            </div>
          </div>

          <div className="details-info">
            <div className="details-brand">{brand}</div>
            <h1 className="details-name">{name}</h1>
            <div className="details-rating-row">
              <span className="star-badge"><FaStar /> {rating}</span>
              <span className="rating-count">({ratingCount.toLocaleString("en-IN")} ratings)</span>
            </div>
            <hr className="details-divider" />
            <div className="details-price-block">
              <span className="details-price">Rs.{price.toLocaleString("en-IN")}</span>
              <span className="details-mrp">Rs.{mrp.toLocaleString("en-IN")}</span>
              <span className="details-disc">{discount}% OFF</span>
            </div>
            <p className="inclusive-tax">inclusive of all taxes</p>

            <div className={"size-section" + (sizeError && !selectedSize ? " size-error" : "")}>
              <div className="size-header">
                <span className="size-title">Select Size</span>
                <button className="size-guide-btn">Size Guide</button>
              </div>
              <div className="size-options">
                {sizes.map((sz) => (
                  <button key={sz} className={"size-btn" + (selectedSize === sz ? " selected" : "")}
                    onClick={() => { setSelectedSize(sz); setSizeError(false); }}>{sz}</button>
                ))}
              </div>
              {sizeError && !selectedSize && <p className="size-error-msg">Please select a size</p>}
            </div>

            <div className="details-cta">
              <button className="cta-bag" onClick={handleAddToBag}><FaShoppingBag /> ADD TO BAG</button>
              <button className={"cta-wishlist" + (isWishlisted ? " wishlisted" : "")} onClick={handleWishlist}>
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                {isWishlisted ? " WISHLISTED" : " WISHLIST"}
              </button>
            </div>
            <button className="buy-now-btn" onClick={handleBuyNow}>BUY NOW</button>

            <div className="delivery-info">
              <div className="delivery-item"><FaTruck /><div><strong>Free Delivery</strong><span>On orders above Rs.499</span></div></div>
              <div className="delivery-item"><FaUndo /><div><strong>Easy Returns</strong><span>30-day return policy</span></div></div>
              <div className="delivery-item"><FaShieldAlt /><div><strong>Secure Payments</strong><span>100% authentic products</span></div></div>
            </div>
            <div className="details-description">
              <h3>Product Details</h3>
              <p>{description}</p>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="similar-section">
            <h2 className="similar-title">Similar Products</h2>
            <div className="similar-grid">
              {similar.map((p) => (
                <Link key={p.id} to={"/product/" + p.id} className="similar-card">
                  <div className="similar-img">
                    <img src={p.image} alt={p.name} onError={(e) => { e.target.src = "https://picsum.photos/seed/sim/200/280"; }} />
                  </div>
                  <p className="similar-brand">{p.brand}</p>
                  <p className="similar-price">Rs.{p.price.toLocaleString("en-IN")}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
