"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cookieSession = _interopRequireDefault(require("cookie-session"));

var _passport = _interopRequireDefault(require("passport"));

var _keys = _interopRequireDefault(require("./config/keys"));

require("./models/User");

require("./services/passport");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Polyfill
// End Polyfill
_mongoose["default"].connect(_keys["default"].mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

var app = (0, _express["default"])();
app.use((0, _cookieSession["default"])({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  // 30 days
  keys: [_keys["default"].cookieKey]
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use('/', _routes["default"]);
var PORT = process.env.PORT || 5000;
app.listen(PORT);