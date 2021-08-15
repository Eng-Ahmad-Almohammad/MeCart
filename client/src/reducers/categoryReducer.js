import { ContentAreaTypes } from "../actions";
import {
 FETCH_CATEGORY
} from "../actions/types";

const InitialState = {
  isFailed: false,
  component: ContentAreaTypes.PRODUCTS,
  failedComponent: null,
  categories: [],
};

const categoryReducer = function (state = InitialState, action) {
  switch (action.type) {
    case FETCH_CATEGORY:

      return {
        ...state,
        isFailed: false,
        component: ContentAreaTypes.PRODUCTS,
        failedComponent: null,
        categories: [...action.payload],
      };

    default:
      return state;
  }
};

export default categoryReducer;