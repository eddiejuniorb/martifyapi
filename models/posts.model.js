// "use strict";

const conn = require("../Database");

var Post = function (title, metatitle, thumbnail, content, author) {
  this.title = title;
  this.metatitle = metatitle;
  this.thumbnail = thumbnail;
  this.content = content;
  this.author = author;
};

Post.create = function (payload, result) {
  conn.query(
    "insert into post (title, metatitle, thumbnail, content, author) values (?,?,?,?,?)",
    [
      payload.title,
      payload.metatitle,
      payload.thumbnail,
      payload.content,
      payload.author,
    ],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      return result(null, res.insertId);
    }
  );
};

Post.getAll = function (callback) {
  conn.query("select * from post", (err, posts) => {
    if (err) return callback(err, null);
    return callback(null, posts);
  });
};

Post.findOne = function (metatitle, result) {
  conn.query(
    "Select title, thumbnail, content, author from post where metatitle =?",
    [metatitle],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      return result(null, res[0]);
    }
  );
};

Post.updateOne = function (id, result) {};

Post.delete = (id, result) => {
  conn.query("delete from post where id=?", id, (err, res) => {
    if (err) return result(err, null);
    return result(null, res.affectedRows);
  });
};

module.exports = Post;
