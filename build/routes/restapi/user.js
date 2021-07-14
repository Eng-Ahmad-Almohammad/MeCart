"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.logout = exports.currentUser = exports.authenticatedUser = void 0;

var _express = require("express");

var authenticatedUser = function authenticatedUser(req, res, next) {
  if (!req.user) {
    res.status(400).send({
      "error": "User must be logged in"
    });
  } else {
    next();
  }
};

exports.authenticatedUser = authenticatedUser;

var currentUser = function currentUser(req, res, next) {
  res.send(req.user);
  next();
};

exports.currentUser = currentUser;

var logout = function logout(req, res, next) {
  req.logout();
  res.send({
    user: req.user
  });
  next();
};

exports.logout = logout;
var router = (0, _express.Router)();
router.get('/current_user', authenticatedUser, currentUser);
router.get('/logout', authenticatedUser, logout);
var _default = router;
exports["default"] = _default;