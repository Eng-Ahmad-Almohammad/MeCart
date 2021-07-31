import axios from "axios";

export const createShoppingList = async (name, description) => {
  if (!name) {
    throw new Error("Name parameter cannot be empty.");
  }

  const res = await axios.post("http://localhost:5000/api/lists", {
    name: name,
    description: description,
  });

  return res;
};

export const getShoppingList = async (listId) => {
  if (!listId) {
    throw new Error("listId parameter cannot be empty.");
  }

  const res = await axios.get(`api/lists/${encodeURI(listId)}`);

  return res;
};

export const getAllShoppingList = async () => {
  const res = await axios.get(`api/lists`);

  return res;
};

export const replaceShoppingList = async (name, description) => {
  if (!name) {
    throw new Error("Name parameter cannot be empty.");
  }

  const res = await axios.put(`api/lists`, {
    name: name,
    description: description,
  });

  return res;
};

export const deleteShoppingList = async (listId) => {
  if (!listId) {
    throw new Error("listId parameter cannot be empty.");
  }

  const res = await axios.delete(`api/lists/${encodeURI(listId)}`);

  return res;
};
