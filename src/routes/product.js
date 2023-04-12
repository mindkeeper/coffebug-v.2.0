const addProduct = require("../controllers/product/addProduct");
const cloudinaryUploader = require("../middlewares/uploads/cloudinary");
const uploadFile = require("../middlewares/uploads/uploadFile");

const Route = require("express").Router();

Route.post("/new", uploadFile("images", 10), cloudinaryUploader, addProduct);

module.exports = Route;
