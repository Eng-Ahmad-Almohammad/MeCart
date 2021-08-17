import { ContentAreaTypes } from "../actions";
import {
  FETCH_STORE_LIST,
  CREATE_STORE_LIST,
  DELETE_STORE,
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
      case CREATE_STORE_LIST:
        return state;
      case DELETE_STORE:
        return state
      default:
        return state;
    }
  }; 

  export default supermarketsReducer;