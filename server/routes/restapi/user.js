import { Router } from "express";

const mongoose = require("mongoose");
const Users = mongoose.model("users");

export const authenticatedUser = (req, res, next) => {
  if (!req.user) {
    res.status(400).send({
      error: "User must be logged in",
    });
  } else {
    next();
  }
};

export const currentUser = (req, res, next) => {
  res.send(req.user);
  next();
};

export const logout = (req, res, next) => {
  const {
    failRedirect,
    successRedirect
  } = req.query || {};

  try {


    req.logout();
    if (successRedirect) {
      res.redirect(successRedirect); // Redirect & exit
      next();
      return;
    }
  }
  catch (err) {
    if (failRedirect) {
      res.redirect(failRedirect); // Redirect & exit
      next();
      return;
    }
  }

  res.send({ user: req.user }); // If no redirect, display this.
  next();
};

export const getUserProfile = async (req, res, next) => {
  const debugInfo = {
    data: req.body,
    function: "getUserProfile",
  };

  console.log({ debugInfo });

  if (!req.params || !req.params.userId) {
    res.status(400).send({error: 'Missing/Invalid userId provided.'})
    return;
  }

  try {
    const user = await Users.findById(req.body.id);
    if (!user) {
      res.status(404).send({ error: 'User not found' });
      return;
    }

    res.send({ user: user });
    next();
  } catch (err) {
    debugInfo.message = err.message;
    console.log({ debugInfo });
    res.status(500).send(err.message);
  }

  return;
}

export const registration = (req, res, next) => {
  // TODO: complete this

  res.send({ user: req.user });
  next();
};

export const authentication = (req, res, next) => {
  // TODO: complete this

  res.send({ user: req.user });
  next();
};

export const signIn = (req, res, next) => {
  // TODO: complete this

  res.send({ user: req.user });
  next();
};

export const signUp = (req, res, next) => {
  // TODO: complete this

  res.send({ user: req.user });
  next();
};

export const updateUser = (req, res, next) => {
  // TODO: complete this

  res.send({ user: req.user });
  next();
};

export const replaceUser = (req, res, next) => {
  // TODO: complete this

  res.send({ user: req.user });
  next();
};

export const deleteUser = (req, res, next) => {
  // TODO: complete this

  res.send({ user: req.user });
  next();
};

const router = Router();

router.get("/current_user", authenticatedUser, currentUser);
router.get("/logout", authenticatedUser, logout);
router.post("/users/registration", registration);
router.post("/users/authentication", authentication);
router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.put("/users/:userId", replaceUser);
router.patch("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);
router.delete("/users/:userId", deleteUser);
router.delete("/users/profiles/:profileId", getUserProfile);

export default router;
