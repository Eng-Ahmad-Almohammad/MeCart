import {
  FETCH_SHOPPING_LIST,
  FETCH_SHOPPING_CONTENT,
  FETCH_SHOPPING_LIST_FIELD,
  CREATE_SHOPPING_LIST,
  DELETE_SHOPING_LIST,
  DELETE_INSTANCE_FROM_SHOPPING_LIST
} from "../actions/types";

const InitialState = {
  isFailed: false,
  items: [],
  shoppingList:{}
};

const shoppingListReducer = function (state = InitialState, action) {
 
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
      return {
        ...state,
        shoppingList:action.payload
      };
    case CREATE_SHOPPING_LIST:
      return state;
    case DELETE_SHOPING_LIST:
      return state;
    case DELETE_INSTANCE_FROM_SHOPPING_LIST:
      return state;
    default:
      return state;
  }
};

export default shoppingListReducer;
