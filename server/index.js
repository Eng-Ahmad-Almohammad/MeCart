// Polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";
// End Polyfill

import express from "express";
import mongoose from "mongoose";

import cors from 'cors';

import cookieSession from "cookie-session";
import passport from "passport";
import keys from "./config/keys";

import "./models";

import "./services/passport";

import routes from "./routes";

import path from "path";
import { getDatabase } from "./services/database-utils"

getDatabase().then(() => {
  const app = express();

  app.use(express.json({ type: 'application/*+json' }));
  
  app.use(cors());

  app.use(express.json());

  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      keys: [keys.cookieKey],
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(express.static(path.join(__dirname, "client")));
  app.use("/", routes);
  
  // Handle any request that doesn't match the routes specified above.
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT);
  
})
