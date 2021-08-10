import { ContentAreaTypes } from "../actions";
import {
  UPDATE_CONTENT_COMPONENT_FAILED,
  UPDATE_CONTENT_COMPONENT_SUCCESS,
} from "../actions/types";

const InitialState = {
  isFailed: false,
  component: ContentAreaTypes.DEFAULT,
  failedComponent: null,
};

const dashboardReducer = function (state = InitialState, action) {
  switch (action.type) {
    case UPDATE_CONTENT_COMPONENT_SUCCESS:
      
      return {
        ...state,
        isFailed: false,
        component: action.payload,
        failedComponent: null,
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
