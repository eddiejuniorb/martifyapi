const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const tokenHeader = req.headers.Authorization || req.headers.authorization;

  if (!tokenHeader.startsWith("Bearer "))
    return res.status(401).send("Invalid token");

  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token or err");

    req.user_id = decoded.user_id;
    req.user_role = decoded.role;
    return next();
  });
}

module.exports = verifyToken;
