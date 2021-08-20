import { Router } from "express";
const mongoose = require("mongoose");

import ProductItances from "../../models/ProductInstance";
import ShoppingLisProduct from '../../models/ShoppingListProduct';
import ShoppingLists from '../../models/ShoppingList';
export const createProductInstance = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "createProductInstance",
  };

  console.log('Hellllllllllllo ProductInstance', req.body);

  try {

    const { id, priceBeforeTax, priceAfterTax, unitOfMeasure, measurement } = req.body;

    const productInstances = new ProductItances({
      priceBeforeTax,
      priceAfterTax,
      unitOfMeasure,
      measurement,
      productId: id,
      dateAdded: Date.now(),
      dateModified: Date.now(),
    });

    await productInstances.save();
    res.send({ productInstance: productInstances });
    next();



  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

export const getProductInstance = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "getProduct",
  };

  console.log({ debugInfo });

  try {
    const productInstance = await ProductItances.find({ productId: req.params.id });

    res.send({ productInstance: productInstance });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};


export const deleteProductInstabce = async (req, res, next) => {
  const debugInfo = {
    data: req.query,
    function: "deleteInstance",
  };

  // console.log('Product Instanceeeee', req.query.InstanceId)
  console.log({ debugInfo });

  try {
    await ProductItances.deleteOne({ _id: req.query.InstanceId });
    await ShoppingLisProduct.deleteMany({ product: req.query.InstanceId })
    await ShoppingLists.updateMany({ products: { $in: req.query.InstanceId } }, { $pullAll: { 'products': [req.query.InstanceId] } })
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
router.post("/productInstance", createProductInstance);//the id added here just for now
router.get("/productInstance/:id", getProductInstance);
router.delete('/productInstance', deleteProductInstabce)
export default router;