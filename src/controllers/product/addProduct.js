const sequelize = require("../../config/sequelize");
const Product = require("../../models/product");
const ProductImages = require("../../models/productImages");
const addProduct = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const uploadedFiles = req.uploadedFiles;
    const { title, description, price, quantity, categoryId } = req.body;
    const product = await Product.create(
      { title, description, quantity, price, categoryId },
      { transaction: t }
    );
    const imageUpload = await ProductImages.bulkCreate(
      uploadedFiles.map((value) => ({
        imageUrl: value,
        productId: product.id,
      })),
      { transaction: t }
    );
    await t.commit();
    res.sendSuccess(201, { product, imageUpload });
  } catch (error) {
    console.log(error);
    t.rollback();
    res.sendServerError();
  }
};

module.exports = addProduct;
