import { Router } from "express";
import { getUserQuery } from "../../services/api-utils";
import { authenticatedUser } from "./user";
const mongoose = require("mongoose");

const ShoppingLists = mongoose.model("shoppingLists");
const ProductInstances = mongoose.model("productInstances");
const ShoppingListPro = mongoose.model("shoppingListProducts");
import ShoppingListProducts from "../../models/ShoppingListProduct"

export const createShoppingList = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "createShoppingList",
  };

  console.log("debug Info=====================", { debugInfo });

  try {
    const { name, description } = req.body;

    const list = new ShoppingLists({
      name: name,
      user: req.user._id,
      description: description,
    });

    await list.save();
    res.send({ shoppingList: list });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

export const getShoppingList = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "getShoppingList",
  };

  console.log({ debugInfo });
  if (!req.params || !req.params.listId) {
    res.status(400).send({ error: 'Missing/Invalid listId provided.' })
    return;
  }

  try {
    const shoppingList = await (await ShoppingLists.findById(req.params.listId).populate('productInstances').where({ user: req.user._id }));
    if (!shoppingList) {
      res.status(404).send({ error: 'Shopping list not found' });
      return;
    }
    const productInstances = await ProductInstances.find({
      '_id': { $in: shoppingList.products }
    });
    //we need to populate three collections here to get the product/product instance and the shopping list
    const shoppingProducts = await ShoppingListPro.find({
      shoppingList: req.params.listId
    })
    // console.log("from api====>",{products})
    res.send({ shoppingList: shoppingList, productInstances: productInstances, shoppingProducts: shoppingProducts });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send({ error: err.message });
  }

  return;
};

export const getAllShoppingList = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "getAllShoppingList",
  };

  console.log({ debugInfo });
  console.log(req.user._id);

  try {
    const shoppingLists = await ShoppingLists.find({ user: req.user._id });

    res.send({ shoppingLists: [...shoppingLists] });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

export const replaceShoppingList = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "replaceShoppingList",
  };

  console.log({ debugInfo });

  try {
    const { name, description } = req.body;

    const updatedList = await ShoppingLists.updateOne(
      { _id: req.params.listId },
      { $set: { name: name, description: description } }
    );

    res.send({ shoppingList: updatedList });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};


export const deleteShoppingList = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "deleteShoppingList",
  };

  console.log({ debugInfo });
  console.log('Ahmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmad', req.query.listId)
  try {
    await ShoppingLists.deleteOne({ _shoppingLists: req.params.listId });
    await ShoppingListProducts.deleteMany({ shoppingList: req.params.listId })
    res.send("Record deleted");
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

const router = Router();

// All routes must be authenticated___commented just for now ___
// router.use(authenticatedUser);

router.post("/lists", createShoppingList);
router.get("/lists", getAllShoppingList);
router.get("/lists/:listId", getShoppingList);
router.put("/lists/:listId", replaceShoppingList);
router.delete("/lists", deleteShoppingList);

export default router;
