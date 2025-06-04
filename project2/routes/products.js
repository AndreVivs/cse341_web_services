const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

const validation = require("../middleware/validate.js");

router.get("/", productsController.getAllProducts);
router.get(
  "/category/:category",
  validation.validateCategoryParam,
  productsController.getByCategory
);
router.get(
  "/id/:id",
  validation.validateMongoId,
  productsController.getProductById
);
router.post(
  "/",
  validation.validateProductBody,
  productsController.createProduct
);
router.put(
  "/id/:id",
  validation.validateProductBody,
  validation.validateMongoId,
  productsController.updateProduct
);
router.delete(
  "/id/:id",
  validation.validateMongoId,
  productsController.deleteProduct
);

module.exports = router;
