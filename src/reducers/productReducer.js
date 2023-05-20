var initialData = {
  shirts: [],
  cart: [],
  wishlist:[],
};

const productReducer = (storeData = initialData, action) => {
  //   alert("Product Reducer Called");
  
     console.log("productReducer Called");
  switch (action.type) {
    case "SHIRTS": {
      return {
        ...storeData,
        shirts: action.payload,
      };
    }
    case "CART": {
      return {
        ...storeData,
        cart: action.payload,
        
      };
    }
    case "WISH": {
      return {
        ...storeData,
        wishlist: action.payload,
        
      };
    }
    case "REMOVEWISH": {
      return {
        ...storeData,
        wishlist: action.payload,
        
      };
    }
    case "REMOVEBAG": {
      return {
        ...storeData,
        cart: action.payload,
        
      };
    }
    case "FILTER": {
      return {
        ...storeData,
        shirts: action.payload,
        
      };
    }
    case "SORT": {
      return {
        ...storeData,
        shirts: action.payload,
        
      };
    }

    default: {
      return storeData;
    }
  }
};

export default productReducer;