import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    referralCode: {
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

const UserModel = mongoose.model("User", userSchema)

export default UserModel;
