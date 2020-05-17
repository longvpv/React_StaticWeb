import { combineReducers } from "redux";
import cartReducer from "./cartItem";


const rootReducer = combineReducers({
  cartReducer,
});

export default rootReducer;