const sequelize = require("../../config/sequelize");
const Product = require("../../models/product");
const ProductImages = require("../../models/productImages");

const editProduct = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const productId = req.params.id;
    const { imageIds, ...body } = req.body;
    console.log(req.uploadedFiles.length);
    const uploadImages = imageIds.split(",").map((id, index) => ({
      imageUrl: req.uploadedFiles[index],
      id,
    }));
    if (!productId) return res.sendClientError(400, "Product id not specified");
    const [rowsCount, updatedProducts] = await Product.update(
      { ...body },
      { where: { id: productId }, returning: true, transaction: t }
    );
    if (rowsCount === 0) return res.sendClientError(404, "Product not found");
    let uploadedImages;
    if (req.uploadedFiles.length > 0) {
      uploadedImages = await ProductImages.bulkCreate(uploadImages, {
        updateOnDuplicate: ["id", "imageUrl"],
        transaction: t,
      });
    }
    await t.commit();
    return res.sendSuccess(200, {
      ...updatedProducts[0].dataValues,
      ...(uploadedImages ? { uploadedImages } : {}),
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    return res.sendServerError();
  }
};

module.exports = editProduct;
