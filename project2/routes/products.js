const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const validation = require("../middleware/validate.js");
const { isAuthenticated } = require("../middleware/authenticate");

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
  isAuthenticated,
  validation.validateProductBody,
  productsController.createProduct
);
router.put(
  "/id/:id",
  isAuthenticated,
  validation.validateProductBody,
  validation.validateMongoId,
  productsController.updateProduct
);
router.delete(
  "/id/:id",
  isAuthenticated,
  validation.validateMongoId,
  productsController.deleteProduct
);

module.exports = router;
