const mongoose = require("mongoose");
const { Schema } = mongoose;

const scanCodeSchema = new Schema({
  scanCode: {
    type: Schema.Types.String,
    required: true,
    index: true,
    unique: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "products"
  },
},
{
  timestamps: true
});

export default mongoose.model("scanCodes", scanCodeSchema);
