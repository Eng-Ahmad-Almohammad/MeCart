const mongoose = require("mongoose");
const { Schema } = mongoose;

const searchResultsSchema = new Schema({
  results: String,
},
{
  timestamps: true
});

export default mongoose.model("searchResults", searchResultsSchema);
