const addProduct = async (req, res, next) => {
  try {
    const uploadedFiles = req.uploadedFiles;
    const { body, files } = req;
    return res.sendSuccess(200, { body, files });
  } catch (error) {
    console.log(error);
    res.sendServerError();
  }
};

module.exports = addProduct;
