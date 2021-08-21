import { Router } from "express";
const mongoose = require("mongoose");

import ShoppingLisProducts from "../../models/ShoppingListProduct";
import shpoingList from '../../models/ShoppingList'
const ShoppingLists = mongoose.model("shoppingLists");

export const addProductToShoppingList = async (req, res, next) => {
    const debugInfo = {
      data: req.body,
      function: "replaceShoppingList",
    };
  
    // console.log({ debugInfo });
  
    try {
      const {quantity, product,shoppingList} = req.body;
  
      const updatedList = await ShoppingLists.updateOne(
        { _id:shoppingList},
        // { $set: { name: name, description: description } },
        {$push:{products:product}}
      );

      const ShoppingLisProduct = new ShoppingLisProducts({
        quantity,
        product,
        shoppingList,
        dateAdded: Date.now(),
        dateModified: Date.now(),
    });
      await ShoppingLisProduct.save()
      res.send({ shoppingList: updatedList });
      next();
    } catch (err) {
      debugInfo.message = err.message;
      console.log({ debugInfo });
      res.status(500).send(err.message);
    }
  
    return;
};


export const deleteInstanceFromList = async (req, res, next) => {
  const debugInfo = {
    data: req.query,
    function: "deleteInstanceFromList",
  };

  // console.log('Product Instanceeeee', req.query.InstanceId)
  console.log({ debugInfo });

  try {
    
    await ShoppingLisProducts.deleteMany({ product: req.query.InstanceId })
    await shpoingList.updateMany({ products: { $in: req.query.InstanceId } }, { $pullAll: { 'products': [req.query.InstanceId] } })
    res.send('Record deleted');
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
}


const router = Router();

router.post("/shoppinglistproduct",addProductToShoppingList)
router.delete('/shoppinglistproduct', deleteInstanceFromList)
export default router;

