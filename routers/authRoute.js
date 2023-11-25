const authRoute = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users.model");

authRoute.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Fill the empty spaces");

  const role = req.body.role || "user";

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User(username, hashedPassword, role);

  User.findByUsername(username, (err, data) => {
    if (err) return res.status(500).send("Internal server error");

    if (data) return res.status(400).send("Username already exists");

    User.add(user, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }
      console.log(data);
      return res.status(200).send("User Added");
    });
  });
});

authRoute.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Fill the empty spaces");

  User.findByUsername(username, async (err, user) => {
    if (err) return res.status(500).send("Internal server error");

    if (!user) return res.status(400).send("No user found");

    const same = await bcrypt.compare(password, user.password);

    if (!same) return res.status(400).send("incorrect password");

    const token = jwt.sign(
      { user_id: user.id, role: user.role },
      process.env.TOKEN,
      { expiresIn: "24h" }
    );

    return res.status(200).send({ token });
  });
});

module.exports = authRoute;
