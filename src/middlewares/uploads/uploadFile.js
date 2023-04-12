const multer = require("multer");
const fileFilter = require("./fileFilter");

const uploader = (fieldName, maxCount) => {
  return multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter(fieldName),
    limits: 1 * 1024 * 1024,
  }).array(fieldName, maxCount);
};

const uploadFile = (fieldName, maxCount) => {
  return (req, res, next) => {
    const upload = uploader(fieldName, maxCount);
    upload(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        console.log(error);
        return res.sendClientError(400, error.message);
      } else if (error) {
        console.log(error);
        return res.sendServerError(error.message);
      }
      console.log("done uploading, proceed to cloudinary");
      next();
    });
  };
};

module.exports = uploadFile;

// const multer = require("multer");
// const path = require("path");

// const memory = multer.memoryStorage();
// const multerOption = {
//   memory,
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const allowedExt = /png|jpg|jpeg/;
//     if (!allowedExt.test(ext)) return cb(new Error("invalid Data Type"), false);
//     cb(null, true);
//   },
//   limits: { fileSize: 1 * 1024 * 1024 },
// };

// const upload = multer(multerOption).array("images", 10);
// const multerHandler = (req, res, next) => {
//   upload(req, res, (error) => {
//     if (error instanceof multer.MulterError) {
//       console.log(error);
//       return res.status(400).json({
//         status: 400,
//         msg: "File too large, image must be 2MB or lower",
//       });
//     } else if (error) {
//       console.log(error);
//       return res.status(415).json({ status: 415, msg: error.message });
//     }
//     next();
//   });
// };

// module.exports = multerHandler;
