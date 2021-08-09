import { UnitOfMeasureKeys } from "../services/unitOfMeasure";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const shoppingListProductSchema = new Schema({
  unitOfMeasure: { type: String, enum: UnitOfMeasureKeys, required: true },
  quantity: { type: Schema.Types.Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "productInstances" },
  // store: { type: Schema.Types.ObjectId, ref: "stores" },
  shoppingList: { type: Schema.Types.ObjectId, ref: "shoppingLists" },
},
{
  timestamps: true
});

export default mongoose.model("shoppingListProducts", shoppingListProductSchema);
