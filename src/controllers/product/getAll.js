const sequelize = require("../../config/sequelize");
const { Op } = require("sequelize");
const Product = require("../../models/product");
const ProductImages = require("../../models/productImages");
const Category = require("../../models/category");
const paginate = require("../../helpers/paginate");
const Categories = require("../../models/category");

const getAll = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      title,
      category,
      minPrice,
      maxPrice,
      sortBy,
      limit = 10,
      page = 1,
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (title)
      whereClause.title = sequelize.where(
        sequelize.fn("LOWER", sequelize.col("title")),
        "LIKE",
        `%${title.toLowerCase()}%`
      );
    if (category) {
      const categoryInstances = await Categories.findOne({
        where: { name: category },
        transaction: t,
      });
      whereClause.categoryId = { [Op.eq]: categoryInstances.id };
    }
    if (minPrice && maxPrice)
      whereClause.price = { [Op.between]: [minPrice, maxPrice] };
    if (minPrice) whereClause.price = { [Op.gte]: minPrice };
    if (maxPrice) whereClause.price = { [Op.lte]: maxPrice };
    const orderClause = [];
    if (sortBy === "cheapest") orderClause.push(["price", "ASC"]);
    if (sortBy === "priciest") orderClause.push(["price", "DESC"]);
    if (sortBy === "newest") orderClause.push(["createdAt", "DESC"]);
    if (sortBy === "oldest") orderClause.push(["createdAt", "ASC"]);
    const totalData = await Product.count({
      where: whereClause,
      transaction: t,
    });
    const products = await Product.findAll({
      where: whereClause,
      order: orderClause,
      attributes: { exclude: ["categoryId"] },
      include: [
        { model: Category, attributes: ["name"] },
        { model: ProductImages, attributes: ["imageUrl"] },
      ],
      limit,
      offset,
      transaction: t,
    });

    const pagination = paginate(totalData, limit, page);
    const formattedResponse = products.map((product) => {
      const { productImages, ...rest } = product.toJSON();
      return {
        ...rest,
        category: product.category.name,
        images: productImages.map((image) => image.imageUrl),
      };
    });
    await t.commit();
    return res.sendSuccess(200, {
      products: formattedResponse,
      ...pagination,
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    return res.sendServerError();
  }
};

module.exports = getAll;
