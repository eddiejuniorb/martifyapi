const conn = require("../Database");

function User(username, password, role) {
  this.username = username;
  this.password = password;
  this.role = role;
}

User.add = (payload, result) => {
  conn.query(
    "insert into users (username,password,role) values (?,?,?)",
    [payload.username, payload.password, payload.role],
    (err, res) => {
      if (err) return result(err, null);
      return result(null, res.insertId);
    }
  );
};

User.findByUsername = (username, callback) => {
  conn.query(
    "select * from users where username = ?",
    [username],
    (err, res) => {
      if (err) return callback(err, null);
      return callback(null, res[0]);
    }
  );
};

User.findById = (id, callback) => {
  conn.query(
    "select id,username,role from users where id = ?",
    [id],
    (err, res) => {
      if (err) return callback(err, null);
      return callback(null, res[0]);
    }
  );
};

module.exports = User;
