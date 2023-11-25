const path = require("path");

function checkfiles(req, res, next) {
  const files = req.files;
  if (!files) return res.status(400).send("No files");
  return next();
}

function checkExts(allowedExts) {
  return (req, res, next) => {
    const files = Array.isArray(req.files.files)
      ? req.files.files
      : [req.files.files];

    const exts = [];

    Object.keys(files).forEach((key) => {
      exts.push(path.extname(files[key].name));
    });

    const passed = exts.every((ext) => allowedExts.includes(ext));

    if (!passed) return res.status(400).send("Unsoported file");

    return next();
  };
}

module.exports = {
  checkExts,
  checkfiles,
};
