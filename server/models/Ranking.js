const mongoose = require("mongoose");
const { Schema } = mongoose;

const rankingSchema = new Schema({
  comments: String,
  rank: String
},
{
  timestamps: true
});

export default mongoose.model("rankings", rankingSchema);
