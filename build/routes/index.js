"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _restapi = _interopRequireDefault(require("./restapi"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.use('/auth', _auth["default"]);
router.use('/api', _restapi["default"]);
var _default = router;
exports["default"] = _default;