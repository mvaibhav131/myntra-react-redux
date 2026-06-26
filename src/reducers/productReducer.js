const initialState = {
  allProducts: [],
  products: [],
  cart: [],
  wishlist: [],
  loading: false,
  sortBy: 'recommended',
  activeFilters: { gender: [], category: [], priceMax: 50000, discount: 0 },
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'LOAD_PRODUCTS':
      return { ...state, allProducts: action.payload, products: action.payload, loading: false };

    case 'ADD_TO_CART': {
      const existing = state.cart.find(
        (i) => i.id === action.payload.id && i.selectedSize === action.payload.selectedSize
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === action.payload.id && i.selectedSize === action.payload.selectedSize
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          (i) => !(i.id === action.payload.id && i.selectedSize === action.payload.selectedSize)
        ),
      };

    case 'UPDATE_CART_QTY':
      return {
        ...state,
        cart: state.cart
          .map((i) =>
            i.id === action.payload.id && i.selectedSize === action.payload.selectedSize
              ? { ...i, qty: action.payload.qty }
              : i
          )
          .filter((i) => i.qty > 0),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'TOGGLE_WISHLIST': {
      const isIn = state.wishlist.some((i) => i.id === action.payload.id);
      return {
        ...state,
        wishlist: isIn
          ? state.wishlist.filter((i) => i.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      };
    }

    case 'REMOVE_FROM_WISHLIST':
      return { ...state, wishlist: state.wishlist.filter((i) => i.id !== action.payload.id) };

    case 'APPLY_FILTERS': {
      const { gender, category, priceMax, discount, sortBy } = action.payload;
      let filtered = [...state.allProducts];
      if (gender && gender.length > 0) {
        filtered = filtered.filter((p) => gender.includes(p.gender));
      }
      if (category && category.length > 0) {
        filtered = filtered.filter((p) =>
          category.some((c) => p.category.toLowerCase().includes(c.toLowerCase()))
        );
      }
      if (priceMax) {
        filtered = filtered.filter((p) => p.price <= priceMax);
      }
      if (discount && discount > 0) {
        filtered = filtered.filter((p) => p.discount >= discount);
      }
      const sort = sortBy || state.sortBy;
      if (sort === 'price_lth') filtered.sort((a, b) => a.price - b.price);
      else if (sort === 'price_htl') filtered.sort((a, b) => b.price - a.price);
      else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
      else if (sort === 'discount') filtered.sort((a, b) => b.discount - a.discount);
      return {
        ...state,
        products: filtered,
        activeFilters: { gender, category, priceMax, discount },
        sortBy: sort,
      };
    }

    case 'SET_GENDER': {
      const g = action.payload;
      const filtered =
        g === 'all'
          ? [...state.allProducts]
          : state.allProducts.filter((p) => p.gender === g);
      return { ...state, products: filtered, activeFilters: initialState.activeFilters, sortBy: 'recommended' };
    }

    case 'SEARCH': {
      const q = action.payload.toLowerCase();
      const filtered = state.allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
      return { ...state, products: filtered };
    }

    default:
      return state;
  }
};

export default productReducer;