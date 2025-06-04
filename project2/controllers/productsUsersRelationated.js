const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");

const addToFavorites = async (req, res) => {
  //#swagger.tags = ['Add To Favorites']
  const { userId, productId } = req.params;
  const db = mongodb.getDb().db();

  try {
    const userObjectId = new ObjectId(userId);
    const productObjectId = new ObjectId(productId);

    const [user, product] = await Promise.all([
      db.collection("users").findOne({ _id: userObjectId }),
      db.collection("store").findOne({ _id: productObjectId }),
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const favorites = user.favorites || [];

    const alreadyExists = favorites.some(
      (id) => id.toString() === productObjectId.toString()
    );

    if (alreadyExists) {
      return res.status(409).json({ message: "Product already in favorites" });
    }

    const result = await db
      .collection("users")
      .updateOne(
        { _id: userObjectId },
        { $push: { favorites: productObjectId } }
      );

    if (result.modifiedCount === 0) {
      return res
        .status(500)
        .json({ message: "Failed to add product to favorites" });
    }

    res
      .status(200)
      .json({ message: "Product added to favorites successfully" });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  addToFavorites,
};
