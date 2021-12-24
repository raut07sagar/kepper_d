
const jwt = require("jsonwebtoken");
const verify = require("jsonwebtoken");


const createTokens = async (user) => {
 
  const accessToken = await jwt.sign(
    { id: user.username },
    process.env.key,
    {
      expiresIn: "30d"
    }
  );

  return accessToken;
};

const validateToken =  (req, res, next) => {

  try {
    const token = req.header("access-token");
    if (!token) return res.status(403).send("Access denied.");

    const decoded =  jwt.verify(token,process.env.key);
    req.user = decoded;
    next();
} catch (error) {
    res.status(400).send("Invalid token");
}
  };

  module.exports = { createTokens, validateToken };
