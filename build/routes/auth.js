"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// the npm module not the config file
var router = (0, _express.Router)();
router.get('/google', _passport["default"].authenticate('google', {
  scope: ['profile', 'email']
}));
router.get('/google/callback', _passport["default"].authenticate('google'));
var _default = router;
exports["default"] = _default;