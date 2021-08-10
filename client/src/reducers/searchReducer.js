import { ContentAreaTypes } from "../actions";
import {
  SHOW_SEARCH,
} from "../actions/types";

const InitialState = {
    isFailed: false,
    component: ContentAreaTypes.DEFAULT,
    failedComponent: null,
    results: []
  };

  const searchReducer = function (state = InitialState, action) {
    switch (action.type) {
      case SHOW_SEARCH:

        return {
          ...state,
          results: [...action.payload]
        };
      default:
        return state;
    }
  };

  export default searchReducer;
