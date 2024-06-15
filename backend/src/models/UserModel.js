import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    refferalCode: {
      type: String,
      require: true,
    },
    links: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Link',
    }
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.Model("User", userSchema);

export default UserModel;
