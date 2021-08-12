import { query, Router } from "express";
const mongoose = require("mongoose");

import User from "../../models/User";




export const getLeaderboard = async (req, res, next) => {
    const debugInfo = {
      data: req.body,
      function: "getLeaderboard",
    };
  
    console.log({ debugInfo });
    
   
  
    try {
      const users = await User.find().sort({points:-1}).limit(2);
      
      res.send({ users: users });
      next();
    } catch (err) {
      debugInfo.message = err.message;
      console.log({ debugInfo });
      res.status(500).send(err.message);
    }
  
    return;
  };




const router = Router();

router.get("/leaderboard", getLeaderboard);


export default router;