import { Router } from "express";
const mongoose = require("mongoose");
import Store from '../../models/Stores'

export const createSupermarket = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "createSupermarket",
  };

  console.log({ debugInfo });

  try {
    const {
      name,
      address,
      number,
      logo,
      businessInfo,
      geoLocation,
      email,
      rank,
    } = req.body;

    const supermarket = new Store({
      owner: req.user._id,
      name,
      address,
      number,
      logo,
      businessInfo,
      geoLocation,
      email,
      _rank: rank,
      dateAdded: Date.now(),
      dateModified: Date.now(),
    });

    await supermarket.save();

    res.send({ supermarket: supermarket });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send({ error: err.message });
  }

  return;
};

export const getSupermarket = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "getSupermarket",
  };

  console.log({ debugInfo });

  try {
    const supermarket = await Store.find({
      _supermarkets: req.body.id,
    });

    res.send({ supermarket: supermarket });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

export const getAllSupermarkets = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "getAllSupermarkets",
  };

  console.log({ debugInfo });

  try {
    const supermarkets = await Store.find();

    res.send({ supermarkets: supermarkets });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

export const replaceSupermarket = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "replaceSupermarket",
  };

  console.log({ debugInfo });

  try {
    const {
      owner,
      name,
      address,
      number,
      logo,
      businessInfo,
      geoLocation,
      email,
      rank,
    } = req.body;

    const updatedSupermarket = await Store.updateOne(
      { _id: req.body.id },
      {
        $set: {
          owner: owner,
          name: name,
          address: address,
          number: number,
          logo: logo,
          businessInfo: businessInfo,
          geoLocation: geoLocation,
          email: email,
          _rank: rank,
        },
      }
    );

    res.send({ supermarket: updatedSupermarket });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
};

export const deleteSupermarket = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "deleteSupermarket",
  };
  // console.log('Ahmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmad', req.query.StoreId)

  console.log({ debugInfo });

  try {
    await Store.deleteOne({ _id:  req.query.StoreId});

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

router.post("/supermarkets", createSupermarket);
router.get("/supermarkets", getAllSupermarkets);
router.get("/supermarkets/:supermarketId", getSupermarket);
router.put("/supermarkets/:supermarketId", replaceSupermarket);
router.delete("/supermarkets/", deleteSupermarket);

export default router;
