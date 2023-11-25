const profileRoute = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/users.model");

profileRoute.get("/", verifyToken, (req, res) => {
  User.findById(req.user_id, (err, user) => {
    if (err) return res.status(500).send("Internal server error");
  });
});

module.exports = profileRoute;
