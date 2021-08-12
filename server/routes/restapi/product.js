import { Router } from "express";
import multer from "multer";
let random = require('mongoose-simple-random');

let s = new Schema({
  message: String
});
s.plugin(random);
const mongoose = require("mongoose");

RandomObjects= mongoose.model('products', s);

import Products from "../../models/Product";
import {getImageBucket, getImageStorage, ImageStorageMiddleware} from "../../services/database-utils";

export const createProduct = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "createProduct",
  };

  console.log('Hellllllllllllo Product', req.body);  

  try {
    const imageStorage = await getImageStorage();
    const uploader = multer({ storage: imageStorage });
    await uploader.any()(req, res, async () => {
      console.log({files: req.files})
      
      const { name, descriptionOne, descriptionTwo, category } = req.body;
      
      const product = new Products({
        name,
        descriptionOne,
        descriptionTwo,
        // files: req.files.map(f => f.id),
        category,
        dateAdded: Date.now(),
        dateModified: Date.now(),
      });
  
      await product.save();
  
      res.send({ product: product });
      next();
    });

    
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

export const getProduct = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "getProduct",
  };

  console.log({ debugInfo });

  try {
    const product = await Products.findById(req.body.id);

    res.send({ product: product });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

export const getProductImage = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "getProductImage",
  };

  console.log({ debugInfo });

  try {
    const imageBucket = await getImageBucket();
    const product = await Products.findById(req.body.id);
    

    res.send({ product: product });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

export const getAllProducts = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "getAllProducts",
  };

  console.log({ debugInfo });

  try {
    const products = await Products.find();
    console.log(products)
    res.send({ products: products });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

export const replaceProduct = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "replaceProduct",
  };

  console.log({ debugInfo });

  try {
    const { name, descriptionOne, descriptionTwo, category } = req.body;

    const updatedProduct = await Products.updateOne(
      { _id: req.body.id },
      {
        $set: {
          name: name,
          descriptionOne: descriptionOne,
          descriptionTwo: descriptionTwo,
          _category: category,
        },
      }
    );

    res.send({ product: updatedProduct });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

export const getRandomProducts = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "getRandomProducts",
  };

  console.log({ debugInfo });

  try {
    RandomObjects.findRandom({}, {}, {count: 5}, function(err, results) {
      if (err) console.log(err);
      else res.send({ products:  results });
    });
  
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};


export const deleteProduct = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "deleteProduct",
  };

  console.log({ debugInfo });

  try {
    await Products.deleteOne({ _id: req.body.id });

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

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/random_products", getRandomProducts);
router.get("/products/:productId", getProduct);
router.put("/products/:productId", replaceProduct);
router.delete("/products/:productId", deleteProduct);

export default router;
