require("dotenv").config();
const express = require("express");
const bodyPaser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const http = require("http");
const contactRouter = require("./routers/contactRouter");
const blogRouter = require("./routers/blogRouter");
const authRoute = require("./routers/authRoute");
const verifyToken = require("./middlewares/verifyToken");
const profileRoute = require("./routers/profileRoute");

const app = express();
const server = http.createServer(app);

app.disable("x-powered-by");

// middleware
app.use(cors());
app.use(fileUpload());
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));

// Routers
app.use("/contact", contactRouter);
app.use("/blog", blogRouter);
app.use("/auth", authRoute);
app.use("/profile", profileRoute);

// Not Match
app.all("*", (req, res) => {
  res.status(404).send(`Requested URL ${req.path} not found`);
});

server.listen(process.env.PORT, () => {
  console.log("Server is up and running");
});
