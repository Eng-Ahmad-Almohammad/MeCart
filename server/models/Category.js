const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Model.schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
},
{
  timestamps: true
});

export default mongoose.model("categories", categorySchema);
