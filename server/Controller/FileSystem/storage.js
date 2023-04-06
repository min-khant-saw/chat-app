const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Storage");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname);
  if (
    fileExt !== ".png" &&
    fileExt !== ".jpg" &&
    fileExt !== ".gif" &&
    fileExt !== ".jpeg"
  ) {
    return cb(new Error("Only Image Are Allow"));
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter });

module.exports = upload;
