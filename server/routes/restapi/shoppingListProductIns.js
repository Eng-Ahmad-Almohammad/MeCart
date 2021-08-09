import { Router } from "express";
const mongoose = require("mongoose");

import ShoppingLisProducts from "../../models/ShoppingListProduct";
const ShoppingLists = mongoose.model("shoppingLists");

export const addProductToShoppingList = async (req, res, next) => {
    const debugInfo = {
      data: req.body,
      function: "replaceShoppingList",
    };
  
    console.log({ debugInfo });
  
    try {
      const {unitOfMeasure,quantity, product,shoppingList,productInstanceId} = req.body;
  
      const updatedList = await ShoppingLists.updateOne(
        { _id: req.params.listId},
        // { $set: { name: name, description: description } },
        {$push:{products:productInstanceId}}
      );
      const ShoppingLisPriduct = new ShoppingLisProducts({
        unitOfMeasure,
        quantity,
        product:productInstanceId,
        shoppingList,
        dateAdded: Date.now(),
        dateModified: Date.now(),
    });
  
      res.send({ shoppingList: updatedList });
      next();
    } catch (err) {
      debugInfo.message = err.message;
      console.log({ debugInfo });
      res.status(500).send(err.message);
    }
  
    return;
};

const router = Router();

router.put("/productlist/:listId",addProductToShoppingList)

export default router;

