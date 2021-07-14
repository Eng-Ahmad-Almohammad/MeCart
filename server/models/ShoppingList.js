const mongoose = require("mongoose");
const { Schema } = mongoose;

const shoppingListSchema = new Schema({
  name: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "users" },
  rank: [{ type: Schema.Types.ObjectId, ref: "rankings" }],
  products: [{ type: Schema.Types.ObjectId, ref: "shoppingListProducts" }],
},
{
  timestamps: true
});

export default mongoose.model("shoppingLists", shoppingListSchema);
