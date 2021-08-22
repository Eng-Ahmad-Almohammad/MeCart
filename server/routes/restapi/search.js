import { Router } from "express";
const mongoose = require("mongoose");
import Products from '../../models/Product'
import Store from '../../models/Stores'


export const getSearchResults = async (req, res, next) => {
  const debugInfo = {
    data: req.query,
    function: "getSearchResults",
  };

  console.log({ debugInfo });

  try {
    
    const results = req.query.type === 'Supermarkets' ? await Store.find({$or:[{name: req.query.search}, {address: req.query.search }]}) : await Products.find({name: req.query.search });
    console.log(results)
    res.send({ results: results });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

const router = Router();

router.get("/search/", getSearchResults);

export default router;
