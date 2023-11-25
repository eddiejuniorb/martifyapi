const { checkfiles, checkExts } = require("../middlewares/files");
const path = require("path");

const Post = require("../models/posts.model");

const blogRouter = require("express").Router();

// Get blogs
blogRouter.get("/", (req, res) => {
  res.send("Hi");
});

// Post blog
blogRouter.post(
  "/add",
  checkfiles,
  checkExts([".jpeg", ".png", ".jpg"]),
  async (req, res) => {
    const { title, content } = req.body;

    const files = Array.isArray(req.files.files)
      ? req.files.files
      : [req.files.files];

    if (!title || !content) return res.status(400).send("Fill the empty space");

    const metatile = title.split(" ").join("-");

    const filename = [];

    const filepath = `${Date.now()}_${Math.random()
      .toString()
      .substring(2, 8)}`;

    Object.keys(files).forEach((key) => {
      files[key].mv(
        `./uploads/${filepath}${path.extname(files[key].name)}`,
        (err) => {}
      );
      filename.push(`./uploads/${filepath}${path.extname(files[key].name)}`);
    });

    const post = new Post(title, metatile, filename[0], content, 1);

    Post.create(post, (err, res1) => {
      if (err) {
        console.log(err);
        return res.status(400).send("Fill the empty space");
      }
      console.log(res1);
      return res.send("Post Added");
    });
  }
);

blogRouter.delete("/delete", async (req, res) => {
  const { id } = req.body;

  if (!id) throw new CustomError("Provide the post id", 400);

  Post.delete(id, (err, data) => {
    if (err) return res.status(400).send("Internal Server Error");

    if (!data) return res.status(400).send("No post found");

    return res.status(200).send("Post Deleted");
  });
});

module.exports = blogRouter;
