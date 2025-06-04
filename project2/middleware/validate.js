const { ObjectId } = require("mongodb");
const Validator = require("validatorjs");

const productRules = {
  name: "required|string|min:2|max:100",
  category: "required|string|min:2",
  price: "required|string|min:1",
  stock: "required|string|min:1",
  description: "required|string|min:5",
};

validateProductBody = (req, res, next) => {
  const validation = new Validator(req.body, productRules);

  if (validation.fails()) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: validation.errors.all() });
  }

  next();
};

validateMongoId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }
  next();
};

validateCategoryParam = (req, res, next) => {
  const { category } = req.params;
  if (!category || typeof category !== "string" || category.trim().length < 2) {
    return res.status(400).json({ message: "Invalid category format" });
  }
  next();
};

module.exports = {
  validateProductBody,
  validateMongoId,
  validateCategoryParam,
};
