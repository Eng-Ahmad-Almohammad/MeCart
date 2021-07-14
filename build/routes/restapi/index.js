"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var requestLogger = function requestLogger(req, res, next) {
  console.log({
    datetime: new Date().toUTCString(),
    headers: req.headers
  });
  next();
};

var router = (0, _express.Router)();
router.use(requestLogger);
router.use(_user["default"]);
var _default = router;
exports["default"] = _default;