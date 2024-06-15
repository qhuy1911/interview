import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      require: true,
    },
    product_name: {
      type: String,
      require: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    is_deleted: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
  }, 
  {
    timestamps: true,
  },
);

const LinkModel = mongoose.model("Link", linkSchema);

export default LinkModel;