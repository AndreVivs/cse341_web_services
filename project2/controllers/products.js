const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

getAllProducts = async (req, res) => {
  // #swagger.tags = ['Products']
  try {
    const products = await mongodb
      .getDb()
      .db()
      .collection("store")
      .find()
      .toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

getByCategory = async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Get all products by category name'
  const { category } = req.params;

  try {
    const products = await mongodb
      .getDb()
      .db()
      .collection("store")
      .find({ category: { $regex: new RegExp(`^${category}$`, "i") } })
      .toArray();

    if (!products.length) {
      return res
        .status(404)
        .json({ message: `No products found in category '${category}'` });
    }

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products by category", error });
  }
};

getProductById = async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Get product by ID'
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  const productId = new ObjectId(id);
  try {
    const product = await mongodb
      .getDb()
      .db()
      .collection("store")
      .findOne({ _id: productId });
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product ${productId} not found` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

createProduct = async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Create a new product'
  const product = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock || "0",
    description: req.body.description,
  };

  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("store")
      .insertOne(product);
    res.status(201).json({
      message: "Product created successfully",
      productId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

updateProduct = async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Update a product by ID'
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  const productId = new ObjectId(id);
  const updatedProduct = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    stock: req.body.stock || "0",
  };

  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("store")
      .updateOne({ _id: productId }, { $set: updatedProduct });
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Product not found or no changes made" });
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

deleteProduct = async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Delete a product by ID'
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  const productId = new ObjectId(id);

  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("store")
      .deleteOne({ _id: productId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  getAllProducts,
  getByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
