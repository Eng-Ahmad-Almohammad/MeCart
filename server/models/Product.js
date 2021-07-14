const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  descriptionOne: {
    type: String,
    trim: true,
  },
  descriptionTwo: {
    type: String,
    trim: true,
  },
  category: [{
    type: Schema.Types.ObjectId,
    ref: "categories"
  }],
  ranks: [{ type: Schema.Types.ObjectId, ref: "rankings" }],
  files: [{ type: Schema.Types.ObjectId, ref: "images.files"}]
},
{
  timestamps: true
});

export default mongoose.model("products", productSchema);
