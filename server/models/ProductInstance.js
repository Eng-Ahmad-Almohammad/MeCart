import { UnitOfMeasureKeys } from "../services/unitOfMeasure";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const productInstanceSchema = new Schema({
  priceBeforeTax: { type: Schema.Types.Number, required: true },
  priceAfterTax: { type: Schema.Types.Number, required: true },
  unitOfMeasure: { type: String, enum: UnitOfMeasureKeys, required: true },
  measurement: { type: Schema.Types.Number, required: true },
  store: { type: Schema.Types.ObjectId, ref: "stores", required: true },
  ranks: [{ type: Schema.Types.ObjectId, ref: "rankings" }],
},
{
  timestamps: true
});

export default mongoose.model("productInstances", productInstanceSchema);
