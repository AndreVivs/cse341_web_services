const { ObjectId } = require("mongodb");

const validateAddToFavorites = (req, res, next) => {
  const { userId, productId } = req.params;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  if (!ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  next();
};

module.exports = { validateAddToFavorites };
