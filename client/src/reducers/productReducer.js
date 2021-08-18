import { ContentAreaTypes } from "../actions";
import {
  FETCH_PRODUCT_LIST,
  FETCH_PRODUCT_CONTENT,
  FETCH_PRODUCT_LIST_FIELD,
  CREATE_PRODUCT_LIST,
  FETCH_PRODUCT_INSTANCE,
  FETCH_CATEGORY,
  DELETE_PRODUCT,
  CREATE_PRODUCT_INSTANCE,

} from "../actions/types";

const InitialState = {
  isFailed: false,
  component: ContentAreaTypes.DEFAULT,
  failedComponent: null,
  product: [],
  item: {},
  category:[]
};

const productReducer = function (state = InitialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_LIST:

      return {
        ...state,
        isFailed: false,
        component: action.payload,
        failedComponent: null,
        product: [...action.payload],
        item: {}
      };
    case FETCH_PRODUCT_CONTENT:
      return {
        ...state,
        isFailed: true,
        component: action.payload.component,
        failedComponent: action.payload.failedComponent,
        item: []
      };
    case CREATE_PRODUCT_INSTANCE:
      return{
        ...state
      }
    case FETCH_PRODUCT_INSTANCE:
      return {
        ...state,
        item: [...action.payload],
      }
    case FETCH_CATEGORY:

      return {
        ...state,
        category: [...action.payload],
      };
    case CREATE_PRODUCT_LIST:
        return state;
    case DELETE_PRODUCT:
      return state;
    default:
      return state;
  }
};

export default productReducer;
