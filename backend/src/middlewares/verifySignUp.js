import { UserModel } from '../models/index.js';

const checkDuplicateEmail = (req, res, next) => {
  const {email} = req.body;
  UserModel.findOne({
    email: email
  }).then((user) => {
    console.log('res', user)
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    next();
  }).catch(error => {
    res.status(500).send({ message: err });
  })
}

export default {
  checkDuplicateEmail,
}