const mongoose = require("mongoose");

const SubSectionSchema = new mongoose.Schema({
  title: { type: String },
  details: { type: String },
});

const SubSection = mongoose.model("SubSection", SubSectionSchema);
module.exports = SubSection;
