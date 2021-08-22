import { validateEmail } from '../services/validation-utils';

const GeoJSON = require('mongoose-geojson-schema');
const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "users", required: false},
  name: String,
  address: String,
  number: String,
  logo: String,
  businessInfo: String,
  geoLocation: mongoose.Schema.Types.Point,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  ranks: [{ type: Schema.Types.ObjectId, ref: "rankings" }],
},
{
  timestamps: true
});

export default mongoose.model("stores", storeSchema);
