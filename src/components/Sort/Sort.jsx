import React , { useState } from "react";
import "../../helper.css";
import style from "./Sort.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";
import Breadcrums from "../DetailsPage/Breadcrums";
import Pdata from "../Product/Pdata";
import { useDispatch, useSelector } from "react-redux";
import { sortActionCreator } from "../../ActionCreator/productActionCreator";
import { bindActionCreators } from "redux";

const Sort = () => {
  const dispatch = useDispatch();
  const getInitialState = () => {
    const value = "nothing";
    return value;
  };
  const [value, setValue] = useState(getInitialState);
  const handleChange = (e) => {
    setValue(e.target.value);
    let actionCreator = bindActionCreators(sortActionCreator, dispatch);
    actionCreator(value)

  };
  
  return (
    <div className="container">
      <Breadcrums title="Home / Shirts" />
      <div className="flexed">
        <div className="">
          <strong>FILTERS</strong>
        </div>
        <div className="container">

          <select name="Sort" id="sorting" onChange={handleChange}>
              <option value="sortby">Sort by : Recommendation</option>
              <option value="lth">Price: Low to High</option>
              <option value="htl">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sort;
