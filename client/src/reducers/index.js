import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dashboardReducer from "./dashboardReducer";
import shoppingListReducer from "./shoppingListReducer";
<<<<<<< HEAD
import { reducer as formReducer } from 'redux-form';
import productReducer from './productReducer';
import storeReducer from './storeReducer';

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  shoppingList: shoppingListReducer,
  form: formReducer,
  product: productReducer,
  supermarketList:storeReducer
=======
import productReducer from "./productReducer";
import storeReducer from "./storeReducer";
import userReducer from "./userReducer";

import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    shoppingList: shoppingListReducer,
    products: productReducer,
    stores: storeReducer,
    users: userReducer,
    form: formReducer
>>>>>>> 52e37470 (project updates)
});
