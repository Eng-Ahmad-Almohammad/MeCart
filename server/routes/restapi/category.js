import { Router } from "express";
const mongoose = require("mongoose");

import Category from "../../models/Category";

export const createCategory = async (req, res, next) => {
    const debugInfo = {
        data: req.body,
        function: "createategory",
    };

    try {

        const { name, description } = req.body;

        const category = new Category({
            name,
            description,
            dateAdded: Date.now(),
            dateModified: Date.now(),
        });

        await category.save();
        res.send({ category: category });
        next();



    } catch (err) {
        debugInfo.message = err.message;
        console.log({ debugInfo });
        res.status(500).send(err.message);
    }

    return;
};

export const getAllCategories = async (req, res, next) => {
    const debugInfo = {
      data: req.body,
      function: "getProduct",
    };
  
    console.log({ debugInfo });
  
    try {
      const categories = await Category.find({});
  
      res.send({ categories:categories});
      next();
    } catch (err) {
      debugInfo.message = err.message;
      console.log({ debugInfo });
      res.status(500).send(err.message);
    }
  
    return;
  };

const router = Router();
router.post("/category", createCategory);
router.get("/category", getAllCategories);
export default router;