const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  limit: {fileSize: 1000000*10}, //10MB
});
