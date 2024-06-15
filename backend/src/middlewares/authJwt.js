import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(" ")[1];

    jwt.verify(accessToken, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    })
  } else {
    return res.status(401).json({message: "Unauthorized"});
  }
}

export default {
  verifyToken,
};
