import { Router } from "express";
const mongoose = require("mongoose");
import SearchResults from '../../models/SearchResults'

export const getSearchResults = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "getSearchResults",
  };

  console.log({ debugInfo });

  try {
    const results = await SearchResults.find();

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

router.get("/search", getSearchResults);

export default router;
