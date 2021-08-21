import axios from "axios";
import {
  FETCH_USER,
  UPDATE_CONTENT_COMPONENT_FAILED,
  UPDATE_CONTENT_COMPONENT_SUCCESS,
  FETCH_PRODUCT_LIST,
  CREATE_PRODUCT_LIST,
  DELETE_PRODUCT,
  FETCH_PRODUCT_INSTANCE,
  CREATE_PRODUCT_INSTANCE,
  DELETE_PRODUCT_INSTANCE,
  FETCH_PRODUCT_CONTENT,
  FETCH_PRODUCT_LIST_FIELD,

  FETCH_CATEGORY,
  FETCH_SHOPPING_LIST,
  CREATE_SHOPPING_LIST,
  DELETE_SHOPING_LIST,
  DELETE_INSTANCE_FROM_SHOPPING_LIST,
  CREATE_SHOPPING_LIST_PRODUCT_INSTANCE,
  FETCH_SHOPPING_CONTENT,
  FETCH_SHOPPING_LIST_FIELD,
  FETCH_STORE_LIST,
  CREATE_STORE_LIST,
  FETCH_STORE_LIST_FEILD,
  DELETE_STORE,
  FETCH_LEADERBOARD,
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

export const fetchLeaderboard = () => async (dispatch) => {
  const res = await axios.get("/api/leaderboard");


  if (res.status === 200) {


    dispatch({ type: FETCH_LEADERBOARD, payload: res.data.users })


  }
}

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
  console.log("sign up values are: ", values);
  const res = await axios.post("/api/sign-up", values);

  dispatch({ type: SIGN_UP, payload: res.data });
};

export const profile = (userId) => async (dispatch) => {
  const res = await axios.get("/api/users/", {
    params: {
      userId: userId,
    },
  });

  if (res.status === 200) {
    dispatch({ type: FETCH_PROFILE, payload: res.data.user });
  }
};

export const showSearch = () => async (dispatch) => {
  const res = await axios.get("/api/search");
  console.log("from get search results====> ", res);
  if (res.status === 200) {
    dispatch({ type: SHOW_SEARCH, payload: res.data.search });
  }
};

export const createShoppingList = (list) => async (dispatch) => {


  const res = await axios({
    method: "post",
    url: "api/lists",
    headers: {

      'Content-Type': 'application/json'
    },
    data: JSON.stringify(list)
  });

  console.log('from list creation', res);

  dispatch({ type: CREATE_SHOPPING_LIST, payload: res.data });
  dispatch(getAllShoppingList())
};

export const deleteShoppingList = (listId) => async (dispatch) => {
  const res = await axios.delete("/api/lists/", {
    params: {
      listId: listId,
    },
  });

  if (res.status === 200) {
    dispatch({ type: DELETE_SHOPING_LIST, payload: res.data })
    dispatch(getAllShoppingList());
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  const res = await axios.delete("/api/products/", {
    params: {
      productId: productId,
    },
  });

  if (res.status === 200) {
    dispatch({ type: DELETE_PRODUCT, payload: res.data })
    dispatch(getAllProducts());
  }
};

export const deleteStore = (StoreId) => async (dispatch) => {
  const res = await axios.delete("/api/supermarkets/", {
    params: {
      StoreId: StoreId,
    },
  });

  if (res.status === 200) {
    dispatch({ type: DELETE_STORE, payload: res.data })
    dispatch(getAllSupermarkets());
  }
};

export const deleteInstance = (InstanceId, productId) => async (dispatch) => {
  const res = await axios.delete("/api/productInstance/", {
    params: {
      InstanceId: InstanceId,
    },
  });

  if (res.status === 200) {
    dispatch({ type: DELETE_PRODUCT_INSTANCE, payload: res.data })
    dispatch(getProductInstance(productId))
  }
};

export const deleteInstanceFromList = (InstanceId, listId) => async (dispatch) => {
  console.log("<<<<<< delete Instance >>>>>> : " , InstanceId, listId);
  const res = await axios.delete("/api/shoppinglistproduct/", {
    params: {
      InstanceId: InstanceId,
    },
  });

  if (res.status === 200) {
    dispatch({ type: DELETE_INSTANCE_FROM_SHOPPING_LIST, payload: res.data })
    dispatch(getShoppingList(listId))
  }
};



export const updateShoppingList = (listId, list) => async (dispatch) => {
  const res = await axios.put(`/api/lists/${listId}`, list);

  dispatch({ type: FETCH_SHOPPING_LIST, payload: res.data });
};

export const getAllShoppingList = () => async (dispatch) => {
  const res = await axios.get("/api/lists");
  if (res.status === 200) {
    dispatch({ type: FETCH_SHOPPING_LIST, payload: res.data.shoppingLists });
  }
};

export const getShoppingList = (listId) => async (dispatch) => {
  const res = await axios.get(`/api/lists/${listId}`);
  console.log("from getting one shopping list", { res })
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


  dispatch({ type: CREATE_PRODUCT_LIST, payload: res.data });
  dispatch(getAllProducts())
};

export const addProductToShoppingList = (val,id) => async (dispatch) => {
 const obj={...val,product:id}

  const res = await axios(`/api/shoppinglistproduct`, {
    method: 'post',
    headers: {

      'Content-Type': 'application/json'
    },
    data: JSON.stringify(obj)
  });

  console.log("from adding to a shopping list======>", { res });

  dispatch({ type: CREATE_SHOPPING_LIST_PRODUCT_INSTANCE, payload: res.data });
};
export const createSupermarket = (supermarket) => async (dispatch) => {
  const res = await axios({
    method: "post",
    url: "/api/supermarkets",
    headers: {

      'Content-Type': 'application/json'
    },
    data: JSON.stringify(supermarket)
  });


  dispatch({ type: CREATE_STORE_LIST, payload: res.data });
  dispatch(async()=> await getAllSupermarkets())
};

export const getAllProducts = () => async (dispatch) => {
  const res = await axios.get("/api/products");


  if (res.status === 200) {

    dispatch({ type: FETCH_PRODUCT_LIST, payload: res.data.products })


  }
};

export const replaceSupermarket=(supermarket)=>async (dispatch)=>{
  const res = await axios(`api/supermarkets`, {
    method: 'put',
    headers: {

      'Content-Type': 'application/json'
    },
    data: JSON.stringify(supermarket)
  });

  dispatch(getAllSupermarkets())
}
export const getAllSupermarkets = () => async (dispatch) => {
  const res = await axios.get("/api/supermarkets");

  console.log("from supermarkets store", { res });

  if (res.status === 200) {
    dispatch({ type: FETCH_STORE_LIST, payload: res.data.supermarkets });
  }
};

export const getSupermarket = (supermarketId) => async (dispatch) => {
  const res = await axios.get(`/api/supermarkets/${supermarketId}`);
   console.log("from get supermarket===>",{res})
  dispatch({ type:FETCH_STORE_LIST_FEILD, payload: res.data.supermarket });
};

export const replaceProduct=(product)=>async(dispatch)=>{
  const res = await axios(`api/products`, {
    method: 'put',
    headers: {

      'Content-Type': 'application/json'
    },
    data: JSON.stringify(product)
  });

  dispatch(getAllProducts())
}

export const getProduct = (productId) => async (dispatch) => {
  const res = await axios.get(`/api/products/${productId}`, {
  });
   console.log("from get product",{res})
  dispatch({ type:FETCH_PRODUCT_LIST_FIELD, payload: res.data.product });
};
export const createProductInstance = (data,id) => async (dispatch) => {
  const obj={...data,id:id}
  const res = await axios(`api/productInstance`, {
    method: 'post',
    headers: {

      'Content-Type': 'application/json'
    },
    data: JSON.stringify(obj)
  });

  console.log("from creating instances====>",{ res });

  dispatch({ type: CREATE_PRODUCT_INSTANCE, payload: res.data });
  dispatch(getProductInstance(id))
};
export const getProductInstance = (productId) => async (dispatch) => {
  const res = await axios.get(`/api/productInstance/${productId}`);
  console.log('from fetch instance', { res })
  dispatch({ type: FETCH_PRODUCT_INSTANCE, payload: res.data.productInstance });
};

export const getAllCategories = () => async (dispatch) => {

  const res = await axios.get("/api/category");
  
  console.log("from category fetc=====>", { res })
  dispatch({ type: FETCH_CATEGORY, payload: res.data.categories });

};