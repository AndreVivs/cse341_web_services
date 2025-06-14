const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock: Number,
  description: String,
});

// Evita sobrescribir el modelo si ya está definido
module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
