import { LinkModel } from "../models/index.js"

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

const createLink = (req, res) => {
  const { userId } = req;
  const { link, product_name} = req.body;
  const newLink = new LinkModel({
    link,
    product_name,
    user_id: userId,
    is_deleted: false,
  })
  newLink
    .save()
    .then(() => {
      res.status(201).send({
        message: "Link was created successfully!"
      })
    })
    .catch(err => {
      res.status(500).send({message: error.message});
    })
}

const deleteLink = (req, res) => {
  const { linkId } = req.params;
  LinkModel.findByIdAndUpdate(linkId, {
    is_deleted: true,
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Liknk with id=${linkId}.`
        });
      } else res.send({ message: "Link was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Link with id=${linkId}`
      });
    });
}

export default {
  getLinksByLoggedInUser,
  createLink,
  deleteLink,
};
