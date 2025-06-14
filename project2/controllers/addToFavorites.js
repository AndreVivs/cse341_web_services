const mongoose = require("mongoose");
const User = require("../models/users");
const Product = require("../models/product");

const addToFavorites = async (req, res) => {
  //#swagger.tags = ['Add To Favorites']
  const { userId, productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid user or product ID" });
  }

  try {
    const [user, product] = await Promise.all([
      User.findById(userId),
      Product.findById(productId),
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyInFavorites = user.favorites.some(
      (favId) => favId.toString() === productId
    );

    if (alreadyInFavorites) {
      return res.status(409).json({ message: "Product already in favorites" });
    }

    user.favorites.push(productId);
    await user.save();

    res.status(200).json({ message: "Product added to favorites successfully" });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  addToFavorites,
};
