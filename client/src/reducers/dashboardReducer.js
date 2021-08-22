import { ContentAreaTypes } from "../actions";
import {
  UPDATE_CONTENT_COMPONENT_FAILED,
  UPDATE_CONTENT_COMPONENT_SUCCESS,
} from "../actions/types";

const InitialState = {
  isFailed: false,
  component: ContentAreaTypes.DEFAULT,
  failedComponent: null,
  oldComponent : ContentAreaTypes.PRODUCTS,
};

const dashboardReducer = function (state = InitialState, action) {
  switch (action.type) {
    case UPDATE_CONTENT_COMPONENT_SUCCESS:
      let oldState= ContentAreaTypes.PRODUCTS
      if ( state.component === ContentAreaTypes.PRODUCTS || state.component === ContentAreaTypes.SUPERMARKETS ) {
        oldState = state.component
        
      }
      return {
        ...state,
        isFailed: false,
        component: action.payload,
        failedComponent: null,
        oldComponent : oldState
      };
    case UPDATE_CONTENT_COMPONENT_FAILED:
      return {
        ...state,
        isFailed: true,
        component: action.payload.component,
        failedComponent: action.payload.failedComponent,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
