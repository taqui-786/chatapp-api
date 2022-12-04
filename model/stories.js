const mongoose = require("mongoose");

const StorySchema = mongoose.Schema(
  {
    username: { type: String },
    userId: { type: String },
    userpic: { type: String },
    userfullname: { type: String },
    story: { type: String },
    replys: [],
  
  },
  {
    timestamps: true,
  }
);
const Storymodel = mongoose.model("Story", StorySchema);
module.exports = Storymodel;
