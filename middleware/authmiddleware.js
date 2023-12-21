const jwt = require('jsonwebtoken');
const secretKey = 'eb0642c1682b4cbdbff98bd3b071600873aef16b51741acf99e1862932be3b6c'
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  console.log("received token" , token);

  jwt.verify(token,secretKey , (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Invalid token' });
    }
    console.log("Decoded token " , decoded);
    req.userId = decoded.userId;
    next();
  });
};
