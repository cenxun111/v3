const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
    },
    likes: [{type: mongoose.Types.ObjectId, ref: 'User'}],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
