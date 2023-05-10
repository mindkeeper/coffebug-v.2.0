const addProduct = require("../controllers/product/addProduct");
const cloudinaryUploader = require("../middlewares/uploads/cloudinary");
const uploadFile = require("../middlewares/uploads/uploadFile");
const productSchema = require("../constants/allowedFields/product");
const Route = require("express").Router();
const allowedBody = require("../middlewares/validations/allowedBody");
const editProduct = require("../controllers/product/editProduct");
const getAll = require("../controllers/product/getAll");
Route.post(
  "/new",
  uploadFile("images", 10),
  cloudinaryUploader,
  allowedBody(productSchema),
  addProduct
);

Route.patch(
  "/edit/:id",
  uploadFile("images", 10),
  cloudinaryUploader,
  editProduct
);

Route.get("/", getAll);
module.exports = Route;
