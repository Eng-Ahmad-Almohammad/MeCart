import { validateEmail } from "../services/validation-utils";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  passportType: { type: String, enum: ['google'], required: true, index: true },
  passportId: { type: String, required: true, index: true, unique: true },
  firstName: String,
  lastName: String,
  emails: [{
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  }],
},
{
  timestamps: true
});

export default mongoose.model("users", userSchema);
