import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import productReducer from "../reducers/productReducer";
import logger from "redux-logger"

const combinedReducer = combineReducers({
  productReducer,
});

export const store = createStore(
  combinedReducer,
  applyMiddleware(thunk, logger)
);