const Product = require("../models/Product");
const mongoose = require("mongoose");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Mongoose usa find() sin args para todos
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

const getByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    });
    if (products.length === 0) {
      return res.status(404).json({ message: `No products found in category '${category}'` });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by category", error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: `Product ${id} not found` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

const createProduct = async (req, res) => {
  const productData = {
  name: req.body.name,
  category: req.body.category,
  price: Number(req.body.price),
  stock: Number(req.body.stock) || 0,
  description: req.body.description,
};


  try {
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      productId: savedProduct._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  const updatedProduct = {
    name: req.body.name,
  category: req.body.category,
  price: Number(req.body.price),
  stock: Number(req.body.stock) || 0,
  description: req.body.description,
  };

  try {
    const result = await Product.updateOne({ _id: id }, { $set: updatedProduct });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Product not found or no changes made" });
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const result = await Product.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
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
