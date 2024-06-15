import mongoose, { Schema } from "mongoose";

const LinkSchema = mongoose.Schema(
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
      type: boolean,
      default: false,
    },
  }, 
  {
    timestamps: true,
  },
);

const LinkModel = mongoose.Model("Link", LinkSchema);

export default LinkModel;