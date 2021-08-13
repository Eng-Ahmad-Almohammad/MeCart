import { ContentAreaTypes } from "../actions";
import {
  FETCH_LEADERBOARD,
} from "../actions/types";

const InitialState = {
  isFailed: false,
  component: ContentAreaTypes.DEFAULT,
  failedComponent: null,
  leaderboard: [],
  item:{},
};

const leaderBoardReducer = function (state = InitialState, action) {

  if (action.type === FETCH_LEADERBOARD) {
   
        
      return {
        ...state,
        isFailed: false,
        component: action.payload,
        failedComponent: null,
        leaderboard: [...action.payload],
        item:{}
      };
  }
      return state;
  
};

export default leaderBoardReducer;
