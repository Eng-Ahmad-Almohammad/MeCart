import { ContentAreaTypes } from "../actions";
import {
  FETCH_PRODUCT_LIST,
  FETCH_PRODUCT_CONTENT,
  FETCH_PRODUCT_LIST_FIELD,
} from "../actions/types";

const InitialState = {
  isFailed: false,
  component: ContentAreaTypes.DEFAULT,
  failedComponent: null,
  product: []
};

const productReducer = function (state = InitialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_LIST:
    
      return {
        ...state,
        isFailed: false,
        component: action.payload,
        failedComponent: null,
        product: [...action.payload]
      };
    case FETCH_PRODUCT_CONTENT:
      return {
        ...state,
        isFailed: true,
        component: action.payload.component,
        failedComponent: action.payload.failedComponent,
      };
    case FETCH_PRODUCT_LIST_FIELD:
      console.log("FETCH_PRODUCT_LIST_FIELD");
    default:
      return state;
  }
};

export default productReducer;
