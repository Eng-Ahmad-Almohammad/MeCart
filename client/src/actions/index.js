import axios from "axios";
import {
  FETCH_USER,
  UPDATE_CONTENT_COMPONENT_FAILED,
  UPDATE_CONTENT_COMPONENT_SUCCESS,
  FETCH_PRODUCT_LIST,
  CREATE_PRODUCT_LIST,
  FETCH_PRODUCT_INSTANCE,
  FETCH_PRODUCT_CONTENT,
  FETCH_PRODUCT_LIST_FIELD,
  FETCH_SHOPPING_LIST,
  CREATE_SHOPPING_LIST,
  CREATE_SHOPPING_LIST_PRODUCT_INSTANCE,
  FETCH_SHOPPING_CONTENT,
  FETCH_SHOPPING_LIST_FIELD,
  FETCH_STORE_LIST,
  CREATE_STORE_LIST,
  SIGN_IN,
  SIGN_UP,
  FETCH_PROFILE,
  SHOW_SEARCH,
} from "./types";
import _ from "lodash";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const ContentAreaTypes = {
  PRODUCTS: "Products",
  SHOPPING: "Shopping",
  SUPERMARKETS: "Supermarkets",
  LEADERBOARD: "Leaderboard",
  SHOPPING_LIST_DETAILS: "Shopping_list_details",
  USER_PROFILE: "User_Profile",
  SEARCH: "Search",
  DEFAULT: "Dashboard",
  PROFILE: 'Profile'
};

const updateContentComponentFailed = (attemptComponent) => ({
  type: UPDATE_CONTENT_COMPONENT_FAILED,
  payload: {
    component: ContentAreaTypes.DEFAULT,
    failedComponent: attemptComponent,
  },
});

const updateContentComponentSuccess = (newComponent) => ({
  type: UPDATE_CONTENT_COMPONENT_SUCCESS,
  payload: newComponent,
});

export const updateContentComponent = (component) => {
  const newComponent = _.find(ContentAreaTypes, (v) => v === component);
  if (typeof newComponent === "undefined") {
    return updateContentComponentFailed(component);
  }

  return updateContentComponentSuccess(newComponent);
};

export const signIn = (values, history) => async (dispatch) => {
  console.log("sign in values are: " + values);
  const res = await axios.post("/api/sign-in", values);

  history.push("/dashboard");
  dispatch({ type: SIGN_IN, payload: res.data });
};

export const signUp = (values, history) => async (dispatch) => {
  console.log("sign up values are: " , values);
  const res = await axios.post("/api/sign-up", values);

  // history.push("/sign-in");
  dispatch({ type: SIGN_UP, payload: res.data });
};

export const profile = (userId) => async (dispatch) => {
    const res = await axios.get("/api/users/", {
        params: {
            userId: userId,
        },
    });

    if (res.status === 200) {
        dispatch({type: FETCH_PROFILE, payload: res.data.user});
    }
};

export const showSearch = () => async (dispatch) => {
    const res = await axios.get("/api/search");
    console.log("from get search results====> ", res );
    if (res.status === 200) {
      dispatch({ type: SHOW_SEARCH, payload: res.data.search });
    }
};

export const createShoppingList = (list) => async (dispatch) => {


    const res = await axios({
      method:"post",
      url:"api/lists",
      headers: {

        'Content-Type': 'application/json'
      },
      data:JSON.stringify(list)
    });

    console.log('from list creation',res);

    dispatch({ type: CREATE_SHOPPING_LIST, payload: res.data });
};

export const deleteShoppingList = (listId) => async (dispatch) => {
  console.log("<<<<<< delete shopping list >>>>>> : " + listId);
  const res = await axios.delete("/api/lists/", {
    params: {
      listId: listId,
    },
  });

  dispatch({ type: FETCH_SHOPPING_LIST, payload: res.data });
};

export const updateShoppingList = (listId, list) => async (dispatch) => {
  console.log("<<<<<< update shopping list >>>>>> : " + listId);
  const res = await axios.put(`/api/lists/${listId}`, list);

  dispatch({ type: FETCH_SHOPPING_LIST, payload: res.data });
};

export const getAllShoppingList = () => async (dispatch) => {
  const res = await axios.get("/api/lists");
  console.log("from get all lists====> ", res );
  if (res.status === 200) {
    dispatch({ type: FETCH_SHOPPING_LIST, payload: res.data.shoppingLists });
  }
};

export const getShoppingList = (listId) => async (dispatch) => {
  const res = await axios.get(`/api/lists/${listId}`);
  console.log("from getting one shopping list",{res})
  if (res.status === 200) {
    dispatch({ type: FETCH_SHOPPING_LIST_FIELD, payload: res.data });
  }
};

export const createProduct = (product) => async (dispatch) => {
  console.log('Products', product)
  const res = await axios(`api/products`, {
    method: 'post',
    headers: {

      'Content-Type': 'application/json'
    },
    data: JSON.stringify(product)
  });

  console.log({ res });

  dispatch({ type: CREATE_PRODUCT_LIST, payload: res.data });
};
export const addProductToShoppingList = (val,id) => async (dispatch) => {
 const obj={...val,product:id}
 console.log("from adding to a shopping list======>",obj);
 console.log("from adding product to a shopping list",obj)
  const res = await axios(`/api/shoppinglistproduct`, {
    method: 'post',
    headers: {

      'Content-Type': 'application/json'
    },
    data: JSON.stringify(obj)
  });

  console.log("from adding to a shopping list======>",{ res });

  dispatch({ type: CREATE_SHOPPING_LIST_PRODUCT_INSTANCE, payload: res.data });
};
export const createSupermarket = (supermarket) => async (dispatch) => {
  const res = await axios({
    method:"post",
    url:"/api/supermarkets",
    headers: {

      'Content-Type': 'application/json'
    },
    data:JSON.stringify(supermarket)
  });


  dispatch({ type: CREATE_STORE_LIST, payload: res.data });
};

export const getAllProducts = () => async (dispatch) => {
  const res = await axios.get("/api/products");


  if (res.status === 200) {

     dispatch({type: FETCH_PRODUCT_LIST, payload: res.data.products})


  }
};

export const getAllSupermarkets = () => async (dispatch) => {
  const res = await axios.get("/api/supermarkets");

  console.log("from supermarkets store",{ res });

  if (res.status === 200) {
    dispatch({ type: FETCH_STORE_LIST, payload: res.data.supermarkets });
  }
};

export const getSupermarket = (supermarketId) => async (dispatch) => {
  const res = await axios.get("/api/supermarkets/", {
    params: {
      supermarketId: supermarketId,
    },
  });

  dispatch({ type: FETCH_STORE_LIST, payload: res.data.supermarkets });
};

export const getProduct = (productId) => async (dispatch) => {
  const res = await axios.get("/api/products/", {
    params: {
      productId: productId,
    },
  });

  dispatch({ type: FETCH_PRODUCT_LIST, payload: res.data.products });
};

export const getProductInstance = (productId) => async (dispatch) => {
  const res = await axios.get(`/api/productInstance/${productId}`);
  console.log('from fetch instance',{res})
  dispatch({ type:FETCH_PRODUCT_INSTANCE, payload: res.data.productInstance });
};
