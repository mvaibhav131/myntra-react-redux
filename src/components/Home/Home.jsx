import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { loadProductsActionCreator, toggleWishlistAction } from '../../ActionCreator/productActionCreator';
import { FaHeart, FaRegHeart, FaStar, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Home.css';
import '../../App.css';

const BANNERS = [
  {
    id: 1,
    tag: 'NEW ARRIVALS',
    title: 'Summer Collection',
    subtitle: 'Fresh styles, breezy fits — up to 70% OFF',
    cta: 'Shop Now',
    link: '/products/women',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 60%, #ffecd2 100%)',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format',
  },
  {
    id: 2,
    tag: 'MEGA SALE',
    title: "Men's Fashion",
    subtitle: 'Trending styles at unbeatable prices',
    cta: 'Explore',
    link: '/products/men',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=900&q=80&auto=format',
  },
  {
    id: 3,
    tag: 'EXCLUSIVE',
    title: 'Myntra Fashion Week',
    subtitle: 'Top brands, best deals — all in one place',
    cta: 'Discover',
    link: '/products/all',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=80&auto=format',
  },
];

const CATEGORIES = [
  { label: 'Men',          path: '/products/men',    emoji: '👔', color: '#e3f2fd' },
  { label: 'Women',        path: '/products/women',  emoji: '👗', color: '#fce4ec' },
  { label: 'Kids',         path: '/products/kids',   emoji: '🧒', color: '#f3e5f5' },
  { label: 'Shoes',        path: '/products/men?cat=shoes', emoji: '👟', color: '#e8f5e9' },
  { label: 'Bags',         path: '/products/women?cat=bags', emoji: '👜', color: '#fff3e0' },
  { label: 'Beauty',       path: '/products/beauty', emoji: '💄', color: '#fce4ec' },
  { label: 'Jewellery',    path: '/products/women?cat=jewellery', emoji: '💍', color: '#fffde7' },
  { label: 'Home & Living',path: '/products/home',   emoji: '🏠', color: '#e0f7fa' },
];

const bannerSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4500,
  pauseOnHover: true,
  arrows: true,
};

const cardSettings = {
  dots: false,
  infinite: false,
  speed: 400,
  slidesToShow: 5,
  slidesToScroll: 2,
  arrows: true,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 900,  settings: { slidesToShow: 3 } },
    { breakpoint: 600,  settings: { slidesToShow: 2 } },
    { breakpoint: 400,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

const Home = () => {
  const dispatch = useDispatch();
  const { allProducts, wishlist, loading } = useSelector((s) => s.productReducer);

  useEffect(() => {
    dispatch(loadProductsActionCreator());
  }, [dispatch]);

  const wishlistIds = new Set(wishlist.map((w) => w.id));

  const handleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlistAction(product));
    toast.success(
      wishlistIds.has(product.id) ? 'Removed from Wishlist' : 'Added to Wishlist! 💛',
      { icon: false }
    );
  };

  const trendingProducts = allProducts.slice(0, 10);
  const newArrivals = [...allProducts].reverse().slice(0, 10);
  const topRated = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 10);

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero-section">
        <Slider {...bannerSettings}>
          {BANNERS.map((b) => (
            <div key={b.id} className="hero-slide">
              <div className="hero-slide-inner" style={{ background: b.gradient }}>
                <img src={b.img} alt={b.title} className="hero-img" onError={(e) => { e.target.style.display = 'none'; }} />
                <div className="hero-content">
                  <span className="hero-tag">{b.tag}</span>
                  <h1 className="hero-title">{b.title}</h1>
                  <p className="hero-subtitle">{b.subtitle}</p>
                  <Link to={b.link} className="hero-cta">
                    {b.cta} <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Category Strip */}
      <section className="categories-strip container-wide">
        <div className="section-header">
          <h2>Shop by Category</h2>
        </div>
        <div className="cat-strip">
          {CATEGORIES.map((cat) => (
            <Link key={cat.label} to={cat.path} className="cat-item">
              <div className="cat-icon" style={{ background: cat.color }}>
                <span>{cat.emoji}</span>
              </div>
              <span className="cat-label">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      {trendingProducts.length > 0 && (
        <section className="home-section container-wide">
          <div className="section-header">
            <div>
              <h2>Trending Now 🔥</h2>
              <p>What everyone's buying right now</p>
            </div>
            <Link to="/products/all" className="see-all-btn">See All <FaArrowRight /></Link>
          </div>
          <Slider {...cardSettings}>
            {trendingProducts.map((p) => (
              <div key={p.id} className="slider-card-wrapper">
                <ProductCardMini
                  product={p}
                  isWishlisted={wishlistIds.has(p.id)}
                  onWishlist={handleWishlist}
                />
              </div>
            ))}
          </Slider>
        </section>
      )}

      {/* Sale Banner */}
      <section className="sale-banner container-wide">
        <div className="sale-inner">
          <div className="sale-text">
            <span className="sale-tag">LIMITED TIME</span>
            <h2>End of Season Sale</h2>
            <p>Up to <strong>80% OFF</strong> on top brands</p>
          </div>
          <Link to="/products/all" className="sale-btn">Shop the Sale</Link>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="home-section container-wide">
          <div className="section-header">
            <div>
              <h2>New Arrivals ✨</h2>
              <p>Fresh additions just for you</p>
            </div>
            <Link to="/products/all" className="see-all-btn">See All <FaArrowRight /></Link>
          </div>
          <Slider {...cardSettings}>
            {newArrivals.map((p) => (
              <div key={p.id} className="slider-card-wrapper">
                <ProductCardMini
                  product={p}
                  isWishlisted={wishlistIds.has(p.id)}
                  onWishlist={handleWishlist}
                />
              </div>
            ))}
          </Slider>
        </section>
      )}

      {/* Top Rated */}
      {topRated.length > 0 && (
        <section className="home-section container-wide">
          <div className="section-header">
            <div>
              <h2>Top Rated ⭐</h2>
              <p>Loved by our customers</p>
            </div>
            <Link to="/products/all" className="see-all-btn">See All <FaArrowRight /></Link>
          </div>
          <Slider {...cardSettings}>
            {topRated.map((p) => (
              <div key={p.id} className="slider-card-wrapper">
                <ProductCardMini
                  product={p}
                  isWishlisted={wishlistIds.has(p.id)}
                  onWishlist={handleWishlist}
                />
              </div>
            ))}
          </Slider>
        </section>
      )}

      {loading && (
        <div className="spinner-wrapper" style={{ marginTop: 32 }}>
          <div className="spinner" />
        </div>
      )}
    </div>
  );
};

const ProductCardMini = ({ product, isWishlisted, onWishlist }) => (
  <Link to={`/product/${product.id}`} className="mini-card">
    <div className="mini-card-img-wrap">
      <img src={product.image} alt={product.name} loading="lazy" onError={(e) => { e.target.src = 'https://picsum.photos/seed/fallback/200/260'; }} />
      <button className="mini-wishlist-btn" onClick={(e) => onWishlist(e, product)}>
        {isWishlisted ? <FaHeart style={{ color: 'var(--primary)' }} /> : <FaRegHeart />}
      </button>
      {product.tag && <span className={`mini-tag tag-${product.tag}`}>{product.tag}</span>}
    </div>
    <div className="mini-card-info">
      <p className="mini-brand">{product.brand}</p>
      <p className="mini-name">{product.name}</p>
      <div className="mini-price-row">
        <span className="mini-price">₹{product.price.toLocaleString('en-IN')}</span>
        <span className="mini-mrp">₹{product.mrp.toLocaleString('en-IN')}</span>
        <span className="mini-disc">{product.discount}% off</span>
      </div>
      <div className="mini-rating">
        <span className="star-badge"><FaStar /> {product.rating}</span>
        <span className="rating-count">({product.ratingCount.toLocaleString('en-IN')})</span>
      </div>
    </div>
  </Link>
);

export default Home;
