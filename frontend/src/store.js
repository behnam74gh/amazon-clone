import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import {
  createOrderReducer,
  orderDetailsReducer,
  orderMineListReducer,
} from "./reducers/orderReducer";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import {
  userDetailsReduser,
  userRgisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducer";

const initState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRgisterReducer,
  orderCreate: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReduser,
  userUpdateProfile: userUpdateProfileReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
