import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dashboardReducer from "./dashboardReducer";
import shoppingListReducer from "./shoppingListReducer";
import { reducer as formReducer } from 'redux-form';
import productReducer from './productReducer';
import storeReducer from './storeReducer';
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  shoppingList: shoppingListReducer,
  form: formReducer,
  product: productReducer,
  stores: storeReducer,
  users: userReducer,
  supermarketList:storeReducer,
  search: searchReducer
});
