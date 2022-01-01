
const jwt = require("jsonwebtoken");
const verify = require("jsonwebtoken");

const createTokens = async (user) => {
 
  const accessToken = await jwt.sign(
    { id: user.username },
    "SECRET",
    {
      expiresIn: "2h"
    }
  );
console.log("token",accessToken)
  return accessToken;
};


const validateToken =  (req, res, next) => {

  try {
    const token = req.header("access-token");
    if (!token) return res.status(403).send("Access denied.");

    const decoded =  jwt.verify(token,"SECRET");
    req.user = decoded;
    next();
} catch (error) {
    res.status(400).send("Invalid token");
}
  };

  module.exports = { createTokens, validateToken };
