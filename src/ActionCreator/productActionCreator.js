const getSizes = (cat) => {
  if (cat.includes('shoes')) return ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];
  if (['bags', 'jewellery', 'sunglasses', 'skin-care', 'fragrances', 'furniture', 'home-decoration', 'kitchen', 'watches'].some((c) => cat.includes(c)))
    return ['Free Size'];
  return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
};

const KIDS_BRANDS = ['H&M Kids', 'Zara Kids', 'Nike Kids', 'Gap Kids', 'Puma Kids', 'Mothercare'];
const KIDS_NAMES  = ['Printed T-Shirt', 'Cotton Frock', 'Denim Shorts', 'Graphic Hoodie', 'Floral Dress', 'Track Pants', 'Cute Dungarees', 'Polo T-Shirt', 'Leggings Set', 'Party Dress', 'Casual Joggers', 'Striped Top', 'Colourful Kurta', 'Pyjama Set', 'Cartoon Sweatshirt'];

const CATEGORIES = [
  // Men
  { endpoint: 'mens-shirts',        gender: 'men'    },
  { endpoint: 'mens-shoes',         gender: 'men'    },
  { endpoint: 'sunglasses',         gender: 'men'    },
  { endpoint: 'sports-accessories', gender: 'men'    },
  // Women
  { endpoint: 'tops',               gender: 'women'  },
  { endpoint: 'womens-dresses',     gender: 'women'  },
  { endpoint: 'womens-shoes',       gender: 'women'  },
  { endpoint: 'womens-bags',        gender: 'women'  },
  { endpoint: 'womens-jewellery',   gender: 'women'  },
  { endpoint: 'skin-care',          gender: 'women'  },
  // Beauty
  { endpoint: 'fragrances',         gender: 'beauty' },
  // Home & Living
  { endpoint: 'furniture',          gender: 'home'   },
  { endpoint: 'home-decoration',    gender: 'home'   },
  // Studio (activewear / premium)
  { endpoint: 'sports-accessories', gender: 'studio' },
];

export const loadProductsActionCreator = () => async (dispatch, getState) => {
  if (getState().productReducer.allProducts.length > 0) return;
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const responses = await Promise.all(
      CATEGORIES.map((cat) =>
        fetch(`https://dummyjson.com/products/category/${cat.endpoint}?limit=12`)
          .then((r) => r.json())
          .then((data) => ({ products: data.products, gender: cat.gender, catName: cat.endpoint }))
      )
    );
    let uid = 1;
    const allProducts = responses.flatMap((res) =>
      res.products.map((p) => {
        const priceINR = Math.round(p.price * 83);
        const disc = Math.round(p.discountPercentage);
        const mrp = Math.round(priceINR / (1 - disc / 100));
        return {
          id: uid++,
          brand: p.brand || 'Myntra Brand',
          name: p.title,
          category: res.catName.replace('mens-', '').replace('womens-', ''),
          gender: res.gender,
          price: priceINR,
          mrp,
          discount: disc,
          rating: parseFloat(p.rating.toFixed(1)),
          ratingCount: 500 + Math.floor(Math.random() * 9500),
          sizes: getSizes(res.catName),
          image: p.thumbnail,
          images: p.images && p.images.length > 0 ? p.images.slice(0, 4) : [p.thumbnail],
          description: p.description,
          tag: disc > 30 ? 'trending' : p.rating > 4.5 ? 'bestseller' : null,
          visible: true,
        };
      })
    );
    // Kids — generated locally (dummyjson has no kids endpoint)
    let uid2 = uid;
    const kidsProducts = KIDS_NAMES.map((name, i) => ({
      id: uid2++,
      brand: KIDS_BRANDS[i % KIDS_BRANDS.length],
      name,
      category: 'kids-clothing',
      gender: 'kids',
      price: Math.round((299 + i * 120) * 0.65),
      mrp: 299 + i * 120,
      discount: 35,
      rating: parseFloat((3.8 + (i % 5) * 0.1).toFixed(1)),
      ratingCount: 800 + i * 150,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      image: `https://picsum.photos/seed/kids${i + 20}/300/400`,
      images: [`https://picsum.photos/seed/kids${i + 20}/400/500`, `https://picsum.photos/seed/kids${i + 120}/400/500`],
      description: 'Comfortable and stylish kids clothing made from soft, skin-friendly fabric.',
      tag: i < 3 ? 'trending' : null,
      visible: true,
    }));
    allProducts.push(...kidsProducts);

    dispatch({ type: 'LOAD_PRODUCTS', payload: allProducts });
  } catch (err) {
    console.error('Failed to load products, using fallback:', err);
    const fallback = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      brand: ['H&M', 'Zara', 'Levis', 'Nike', 'Puma', 'Adidas', 'Biba', 'AND'][i % 8],
      name: `Fashion Product ${i + 1}`,
      category: ['shirts', 'dresses', 'jeans', 'shoes', 'bags'][i % 5],
      gender: ['men', 'women', 'men', 'women', 'men'][i % 5],
      price: 500 + (i + 1) * 200,
      mrp: 1000 + (i + 1) * 350,
      discount: 30 + (i % 3) * 10,
      rating: parseFloat((3 + Math.random()).toFixed(1)),
      ratingCount: 100 + i * 50,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      image: `https://picsum.photos/seed/fb${i + 1}/300/450`,
      images: [`https://picsum.photos/seed/fb${i + 1}/300/450`],
      description: 'A premium fashion product for everyday wear.',
      tag: null,
      visible: true,
    }));
    dispatch({ type: 'LOAD_PRODUCTS', payload: fallback });
  }
};

export const addToCartAction = (product, selectedSize) => ({
  type: 'ADD_TO_CART',
  payload: { ...product, selectedSize },
});

export const removeFromCartAction = (product) => ({
  type: 'REMOVE_FROM_CART',
  payload: product,
});

export const updateCartQtyAction = (product, qty) => ({
  type: 'UPDATE_CART_QTY',
  payload: { ...product, qty },
});

export const clearCartAction = () => ({ type: 'CLEAR_CART' });

export const toggleWishlistAction = (product) => ({
  type: 'TOGGLE_WISHLIST',
  payload: product,
});

export const removeFromWishlistAction = (product) => ({
  type: 'REMOVE_FROM_WISHLIST',
  payload: product,
});

export const applyFiltersAction = (filters) => ({
  type: 'APPLY_FILTERS',
  payload: filters,
});

export const setGenderAction = (gender) => ({
  type: 'SET_GENDER',
  payload: gender,
});

export const searchAction = (query) => ({
  type: 'SEARCH',
  payload: query,
});
