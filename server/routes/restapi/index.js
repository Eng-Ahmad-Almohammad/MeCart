import userRoutes from "./user";
import supermarketRoutes from "./supermarket";
import productRoutes from "./product";
import shoppingListRoutes from "./list";
import productInstance from "./productInstance";
import shoppinglistproduct from "./shoppingListProductIns";
import category from "./category";
import leaderboardRoutes from './leaderboard';
import { Router } from "express";

const requestLogger = (req, res, next) => {
  console.log({ datetime: new Date().toUTCString(), body: req.body, params: req.params });
  next();
};

const router = Router();

router.use(requestLogger);

router.use(userRoutes);

router.use(supermarketRoutes);

router.use(productRoutes);

router.use(shoppingListRoutes);

router.use(productInstance);

router.use(shoppinglistproduct);

router.use(category);

router.use(leaderboardRoutes)

export default router;
