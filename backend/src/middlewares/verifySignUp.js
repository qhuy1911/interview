import { UserModel } from '../models';

const checkDuplicateEmail = (req, res, next) => {
  const {email} = req.body;
  UserModel.findOne({
    email: email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    next();
  })
}

export default {
  checkDuplicateEmail,
}