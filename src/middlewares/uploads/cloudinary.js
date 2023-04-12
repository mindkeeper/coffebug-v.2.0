const cloudinary = require("../../config/cloudinary");
const dataUriParser = require("datauri/parser");
const path = require("path");

async function cloudinaryUploader(req, res, next) {
  const { files } = req;
  req.uploadedFiles = [];
  console.log("start uploading in cloudinary");
  const uploadPromises = files.map(async (e) => {
    const parser = new dataUriParser();
    const buffer = e.buffer;
    const ext = path.extname(e.originalname).toString();
    const datauri = parser.format(ext, buffer);

    const result = await cloudinary.uploader.upload(datauri.content, {
      public_id: `${Math.floor(Math.random() * 10e9)}`,
      folder: "coffebug-v2",
    });
    return result.url;
  });

  try {
    const uploadedFiles = await Promise.all(uploadPromises);
    req.uploadedFiles = uploadedFiles;
    console.log("uploading success");
    next();
  } catch (error) {
    console.log(error);
    return res.sendServerError();
  }
}

module.exports = cloudinaryUploader;
