const multer = require('multer');

exports.upload = multer({
  limits: {
    fileSize: 10 * 11024 * 11024,
  }
});
