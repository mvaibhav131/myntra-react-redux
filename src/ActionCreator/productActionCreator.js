import { useState } from "react";
export const productActionCreator = () => {
  return (dispatch, getState) => {
    const getElectronicData = () => {
      console.log("API is Called");
      fetch("https://charlesgalwyn.github.io/gocoapi/shirts.json")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          //  electronicAction(data, dispatch);

          dispatch({
            type: "SHIRTS",
            payload: data.shirts,
          });
        });
    };

    if (getState().productReducer.shirts.length === 0) {
      getElectronicData();
    }
  };
};

export const bagActionCreator = (data) => {
  return (dispatch, getState) => {
    const getElectronicData = () => {
      console.log("API is Called");
      const cartArray= getState().productReducer.cart;
      cartArray.push(data)
          

          dispatch({
            type: "CART",
            payload: cartArray,
          });
        
    };

    
      getElectronicData();
    
  };
};

export const wishActionCreator = (data) => {
  return (dispatch, getState) => {
    const getElectronicData = () => {
      console.log("API is Called");
      const cartArray= getState().productReducer.wishlist;
      cartArray.push(data)
          

          dispatch({
            type: "WISH",
            payload: cartArray,
          });
        
    };

    
      getElectronicData();
    
  };
};

export const removeWishActionCreator = (data) => {
  return (dispatch, getState) => {
    const getElectronicData = () => {
      console.log("API is Called");
      const cartArray= getState().productReducer.wishlist;
      const newcartArray= cartArray.filter((item)=> item.id !== data.id)
          

          dispatch({
            type: "REMOVEWISH",
            payload: newcartArray,
          });
        
    };

    
      getElectronicData();
    
  };
};

export const removeBagActionCreator = (data) => {
  return (dispatch, getState) => {
    const getElectronicData = () => {
      console.log("API is Called");
      const cartArray= getState().productReducer.cart;
      const newcartArray= cartArray.filter((item)=> item.id !== data.id)
          

          dispatch({
            type: "REMOVEBAG",
            payload: newcartArray,
          });
        
    };

    
      getElectronicData();
    
  };
};

export const filterActionCreator = (data) => {
  return (dispatch, getState) => {
    const getElectronicData = () => {
      console.log("API is Called");
      const shirtArray= getState().productReducer.shirts;
      if (shirtArray.length === 15) {
      const newshirtArray= shirtArray.filter((item)=> item.pname === data)
          

          dispatch({
            type: "FILTER",
            payload: newshirtArray,
          });
        }
        else {
          fetch("https://charlesgalwyn.github.io/gocoapi/shirts.json")
        .then((res) => res.json())
        .then((data) => {

          dispatch({
            type: "SHIRTS",
            payload: data.shirts,
          });
        });
        }
        
    };

    
      getElectronicData();
    
  };
};

export const filterCatActionCreator = (data) => {
  return (dispatch, getState) => {
    const getElectronicData = () => {
      console.log("API is Called");
      const shirtArray= getState().productReducer.shirts;
      if (shirtArray.length === 15) {
      const newshirtArray= shirtArray.filter((item)=> item.category === data)
          

          dispatch({
            type: "FILTER",
            payload: newshirtArray,
          });
        }
        else {
          fetch("https://charlesgalwyn.github.io/gocoapi/shirts.json")
        .then((res) => res.json())
        .then((data) => {

          dispatch({
            type: "SHIRTS",
            payload: data.shirts,
          });
        });
        }
        
    };

    
      getElectronicData();
    
  };
};

export const filterGenderActionCreator = (data) => {
  return (dispatch, getState) => {
    const getElectronicData = () => {
      console.log("API is Called");
      const shirtArray= getState().productReducer.shirts;
      if (shirtArray.length === 15) {
      const newshirtArray= shirtArray.filter((item)=> item.filter === data)
          

          dispatch({
            type: "FILTER",
            payload: newshirtArray,
          });
        }
        else {
          fetch("https://charlesgalwyn.github.io/gocoapi/shirts.json")
        .then((res) => res.json())
        .then((data) => {

          dispatch({
            type: "SHIRTS",
            payload: data.shirts,
          });
        });
        }
        
    };

    
      getElectronicData();
    
  };
};

export const sortActionCreator = (data) => {
  return (dispatch, getState) => {
    const getElectronicData = () => {
      console.log("API is Called");
      const shirtArray= getState().productReducer.shirts;

      if (data==="lth"){
      var newArr=shirtArray.slice().sort(function(a,b){
        return Number(b.price.substring(3))- Number(a.price.substring(3))
      })

      dispatch({
            type: "SORT",
            payload: newArr,
          });
      }
      else {
      var newArr=shirtArray.slice().sort(function(a,b){
        return Number(a.price.substring(3))- Number(b.price.substring(3))
      })
      dispatch({
            type: "SORT",
            payload: newArr,
          });
      }
                  
    };    
      getElectronicData();
    
  };
};

export const searchActionCreator = (data) => {
  return (dispatch, getState) => {
    const getElectronicData = () => {
      console.log("API is Called");
      const shirtArray= getState().productReducer.shirts;
      const lowdata = data.toLowerCase();
      const searchArray= shirtArray.filter((item)=> {
        if (item.pname=== lowdata || item.filter===lowdata || item.category=== lowdata){
          return item
        }
      })
          

          dispatch({
            type: "FILTER",
            payload: searchArray,
          });
        
        
    };

    
      getElectronicData();
    
  };
};