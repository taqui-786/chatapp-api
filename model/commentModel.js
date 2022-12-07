const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    postId: { type: String },
    userId: { type: String },
    username: { type: String },
   comment: { type: String },
  },
  {
    timestamps: true,
  }
);
const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;
