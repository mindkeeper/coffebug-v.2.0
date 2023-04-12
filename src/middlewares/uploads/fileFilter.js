const fileFilter = (fieldName) => {
  return (req, file, cb) => {
    let allowedTypes = [];
    let errorMessage = "";
    if (fieldName === "documents") {
      allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      errorMessage = "Only pdf, docx, and doc are allowed";
    }
    if (fieldName === "images") {
      allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
      errorMessage = "Only jpg, png, jpeg, and webp are allowed";
    }
    if (allowedTypes.length === 0)
      return cb(new Error("fieldName is not valid"));
    if (!allowedTypes.includes(file.mimetype))
      return cb(new Error(errorMessage), false);
    cb(null, true);
  };
};

module.exports = fileFilter;
