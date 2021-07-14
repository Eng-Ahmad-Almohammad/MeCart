import {
  FETCH_SHOPPING_LIST,
  FETCH_SHOPPING_CONTENT,
  FETCH_SHOPPING_LIST_FIELD,
} from "../actions/types";

const InitialState = {
  isFailed: false,
  items: []
};

const shoppingListReducer = function (state = InitialState, action) {
  console.log("the action is: " + action);
  switch (action.type) {
    case FETCH_SHOPPING_LIST:
      return {
        ...state,
        isFailed: false,
        items: [...action.payload]
      }
    case FETCH_SHOPPING_CONTENT:
      return state;
    case FETCH_SHOPPING_LIST_FIELD:
      return state;
    default:
      return state;
  }
};

export default shoppingListReducer;
