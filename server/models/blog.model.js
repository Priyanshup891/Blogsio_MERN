const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
    },
    summery: {
      type: Schema.Types.String,
    },
    content: {
      type: Schema.Types.String,
    },
    category: {
      type: Schema.Types.String,
    },
    blog_image: {
      id: {
        type: Schema.Types.String,
      },
      url: {
        type: Schema.Types.String,
      },
    },
    auther: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", BlogSchema);
