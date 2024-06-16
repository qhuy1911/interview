import { LinkModel } from "../models/index.js"

const getAllLinks = (req, res) => {
  LinkModel
    .find()
    .then((data) => {
      res.status(200).send({
        message: "Get all Links successfully",
        data: data,
      })
    })
    .catch((err) => {
      res.status(500).send({message: err});
    })
}

const getLinksByLoggedInUser = (req, res) => {
  const { userId } = req;
  LinkModel
    .find({ user_id: userId })
    .exec()
    .then((data) => {
      res.status(200).send({
        message: "Get Links by User ID",
        data: data,
      })
    })
    .catch(error => {
      res.status(500).send({message: error.message});
    })
}

export default {
  getAllLinks,
  getLinksByLoggedInUser,
};
