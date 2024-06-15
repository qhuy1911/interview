import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {generate} from 'referral-codes';
import { UserModel } from '../models/index.js';

const signup = (req, res) => {
  const {email, name, password} = req.body;
  const [referralCode] = generate({
    length: 8,
    count: 1,
  });

  const newUser = new UserModel({
    email,
    name,
    password: bcrypt.hashSync(password, 8),
    referralCode,
  })

  // Save new user to DB
  newUser
    .save()
    .then(() => {
      res.status(201).send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
  // (err, user) => {
  //   if (err) {
  //     res.status(500).send({ message: err });
  //     return;
  //   }

  //   res.status(201).send({ message: "User was registered successfully!" });
  // }
}

const signin = (req, res) => {
  const {email, password} = req.body;
  UserModel.findOne({
    email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign(
      { id: user.id },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).send({
      id: user._id,
      email: user.email,
      name: user.name,
      accessToken: token,
    });
  })
}

export default {
  signup,
  signin,
}