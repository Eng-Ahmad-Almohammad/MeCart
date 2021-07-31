import { ContentAreaTypes } from "../actions";
import {
  FETCH_STORE_LIST,
//   FETCH_PRODUCT_CONTENT,
//   FETCH_PRODUCT_LIST_FIELD,
} from "../actions/types";

const InitialState = {
    isFailed: false,
    component: ContentAreaTypes.DEFAULT,
    failedComponent: null,
    supermarkets: []
  };

  const supermarketsReducer = function (state = InitialState, action) {
    switch (action.type) {
      case FETCH_STORE_LIST:
      
        return {
          ...state,
          supermarkets: [...action.payload]
        };
      default:
        return state;
    }
  }; 

  export default supermarketsReducer;