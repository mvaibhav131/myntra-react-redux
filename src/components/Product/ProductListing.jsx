import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart, FaStar, FaTimes, FaSlidersH } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  loadProductsActionCreator,
  toggleWishlistAction,
  applyFiltersAction,
  setGenderAction,
} from '../../ActionCreator/productActionCreator';
import './ProductListing.css';
import '../../App.css';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest',      label: 'Newest First' },
  { value: 'price_lth',   label: 'Price: Low to High' },
  { value: 'price_htl',   label: 'Price: High to Low' },
  { value: 'rating',      label: 'Customer Rating' },
  { value: 'discount',    label: 'Better Discount' },
];

const ProductListing = () => {
  const { gender } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, allProducts, wishlist, loading } = useSelector((s) => s.productReducer);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    gender: gender !== 'all' ? [gender] : [],
    category: searchParams.get('cat') ? [searchParams.get('cat')] : [],
    priceMax: 50000,
    discount: 0,
    sortBy: 'recommended',
  });

  const wishlistIds = new Set(wishlist.map((w) => w.id));

  useEffect(() => {
    dispatch(loadProductsActionCreator());
  }, [dispatch]);

  useEffect(() => {
    if (gender !== 'all') dispatch(setGenderAction(gender === 'kids' ? 'kids' : gender));
    else dispatch(setGenderAction('all'));
  }, [gender, dispatch]);

  useEffect(() => {
    dispatch(applyFiltersAction(localFilters));
  }, [localFilters, dispatch]);

  const toggleFilter = (field, value) => {
    setLocalFilters((prev) => {
      const arr = prev[field] || [];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [field]: next };
    });
  };

  const handleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlistAction(product));
    toast.success(
      wishlistIds.has(product.id) ? 'Removed from Wishlist' : 'Added to Wishlist! 💛',
      { icon: false }
    );
  };

  const handleSort = (val) => {
    setLocalFilters((prev) => ({ ...prev, sortBy: val }));
  };

  const clearFilters = () => {
    setLocalFilters({
      gender: gender !== 'all' ? [gender] : [],
      category: [],
      priceMax: 50000,
      discount: 0,
      sortBy: 'recommended',
    });
  };

  const genderLabel = gender
    ? gender.charAt(0).toUpperCase() + gender.slice(1)
    : 'All';

  const allCategories = [...new Set(allProducts.map((p) => p.category))];
  const allBrands = [...new Set(allProducts.map((p) => p.brand))].slice(0, 12);

  const FilterPanel = () => (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <span>FILTERS</span>
        {(localFilters.category.length > 0 || localFilters.priceMax < 50000 || localFilters.discount > 0) && (
          <button className="clear-filters-btn" onClick={clearFilters}>CLEAR ALL</button>
        )}
      </div>

      {/* Category */}
      <div className="filter-group">
        <div className="filter-group-title">Category</div>
        {allCategories.map((cat) => (
          <label key={cat} className="filter-option">
            <input
              type="checkbox"
              checked={localFilters.category.includes(cat)}
              onChange={() => toggleFilter('category', cat)}
            />
            <span className="checkbox-label">{cat.replace(/-/g, ' ')}</span>
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="filter-group">
        <div className="filter-group-title">Price Range</div>
        <div className="price-range-display">₹0 – ₹{localFilters.priceMax.toLocaleString('en-IN')}</div>
        <input
          type="range"
          min="500"
          max="50000"
          step="500"
          value={localFilters.priceMax}
          onChange={(e) => setLocalFilters((prev) => ({ ...prev, priceMax: Number(e.target.value) }))}
          className="price-slider"
        />
        <div className="price-labels"><span>₹500</span><span>₹50,000</span></div>
      </div>

      {/* Discount */}
      <div className="filter-group">
        <div className="filter-group-title">Discount</div>
        {[10, 20, 30, 40, 50].map((d) => (
          <label key={d} className="filter-option">
            <input
              type="radio"
              name="discount"
              checked={localFilters.discount === d}
              onChange={() => setLocalFilters((prev) => ({ ...prev, discount: d }))}
            />
            <span className="checkbox-label">{d}% and above</span>
          </label>
        ))}
        {localFilters.discount > 0 && (
          <button className="small-clear" onClick={() => setLocalFilters((prev) => ({ ...prev, discount: 0 }))}>
            Clear
          </button>
        )}
      </div>

      {/* Brand */}
      <div className="filter-group">
        <div className="filter-group-title">Brand</div>
        {allBrands.map((brand) => (
          <label key={brand} className="filter-option">
            <input
              type="checkbox"
              checked={(localFilters.brand || []).includes(brand)}
              onChange={() => toggleFilter('brand', brand)}
            />
            <span className="checkbox-label">{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="listing-page">
      {/* Mobile filter overlay */}
      {mobileFilterOpen && (
        <div className="mobile-filter-overlay">
          <div className="mobile-filter-backdrop" onClick={() => setMobileFilterOpen(false)} />
          <div className="mobile-filter-panel">
            <div className="mobile-filter-header">
              <span>Filters</span>
              <button onClick={() => setMobileFilterOpen(false)}><FaTimes /></button>
            </div>
            <FilterPanel />
            <button className="apply-filters-btn" onClick={() => setMobileFilterOpen(false)}>
              Apply Filters ({products.length} items)
            </button>
          </div>
        </div>
      )}

      <div className="listing-inner container-wide">
        {/* Filter sidebar - desktop */}
        <aside className="filter-sidebar hide-mobile">
          <FilterPanel />
        </aside>

        {/* Main content */}
        <div className="listing-main">
          {/* Breadcrumb + Sort bar */}
          <div className="listing-topbar">
            <div className="listing-breadcrumb">
              <Link to="/">Home</Link> / <span>{genderLabel}</span>
              <span className="count-label"> — {products.length} items</span>
            </div>
            <div className="listing-controls">
              <button
                className="mobile-filter-toggle show-mobile"
                onClick={() => setMobileFilterOpen(true)}
              >
                <FaSlidersH /> Filter
              </button>
              <select
                className="sort-select"
                value={localFilters.sortBy}
                onChange={(e) => handleSort(e.target.value)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="spinner-wrapper"><div className="spinner" /></div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <p>No products found. Try clearing filters.</p>
              <button className="clear-filters-btn-lg" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isWishlisted={wishlistIds.has(p.id)}
                  onWishlist={handleWishlist}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, isWishlisted, onWishlist }) => (
  <Link to={`/product/${product.id}`} className="product-card">
    <div className="product-card-img-wrap">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        onError={(e) => { e.target.src = 'https://picsum.photos/seed/pcard/240/320'; }}
      />
      <button className="card-wishlist-btn" onClick={(e) => onWishlist(e, product)}>
        {isWishlisted ? <FaHeart style={{ color: 'var(--primary)' }} /> : <FaRegHeart />}
      </button>
      {product.discount >= 20 && (
        <div className="card-discount-badge">{product.discount}% OFF</div>
      )}
    </div>
    <div className="product-card-info">
      <p className="pc-brand">{product.brand}</p>
      <p className="pc-name">{product.name}</p>
      <div className="pc-price-row">
        <span className="pc-price">₹{product.price.toLocaleString('en-IN')}</span>
        <span className="pc-mrp">₹{product.mrp.toLocaleString('en-IN')}</span>
        <span className="pc-disc">({product.discount}% off)</span>
      </div>
      <div className="pc-rating">
        <span className="star-badge"><FaStar /> {product.rating}</span>
        <span className="rating-count">{product.ratingCount.toLocaleString('en-IN')}</span>
      </div>
      {product.tag && (
        <span className={`pc-tag tag-${product.tag}`}>{product.tag}</span>
      )}
    </div>
  </Link>
);

export default ProductListing;
