"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  googleId: String
});
mongoose.model('users', userSchema);