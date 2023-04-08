const allowedBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.sendClientError(400, error.details[0].message);
    next();
  };
};

module.exports = allowedBody;
