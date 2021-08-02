import { Router } from "express";
import multer from "multer";
const mongoose = require("mongoose");

import ProductItances from "../../models/ProductInstance";

export const createProductInstance = async (req, res, next) => {
    const debugInfo = {
      data: req.body,
      function: "createProductInstance",
    };
  
    console.log('Hellllllllllllo ProductInstance', req.body);  
  
    try {
    //   const imageStorage = await getImageStorage();
    //   const uploader = multer({ storage: imageStorage });
    //   await uploader.any()(req, res, async () => {
        // console.log({files: req.files})
        
        const {priceBeforeTax, priceAfterTax, unitOfMeasure, measurement } = req.body;
        
        const productInstance = new ProductItances({
            priceBeforeTax,
            priceAfterTax,
            unitOfMeasure,
            measurement,
            productId:req.params.id,
           dateAdded: Date.now(),
           dateModified: Date.now(),
        });
    
        await productInstances.save();
    
        res.send({ productInstance: productInstance });
        next();
    //   });
  
      
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
      const productInstance = await ProductItances.find({productId:req.params.id});
  
      res.send({ productInstance:productInstance[0] });
      next();
    } catch (err) {
      debugInfo.message = err.message;
      console.log({ debugInfo });
      res.status(500).send(err.message);
    }
  
    return;
  };

  const router = Router();
  router.post("/productInstance/:id", createProductInstance);//the id added here just for now
  router.get("/productInstance/:id",getProductInstance);
  export default router;