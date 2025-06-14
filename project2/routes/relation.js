const express = require("express");
const router = express.Router();
const relationatedController = require("../controllers/addToFavorites.js");
const validation = require("../middleware/validateUserProduct.js");

router.post(
  "/:userId/favorites/:productId",
  validation.validateAddToFavorites,
  relationatedController.addToFavorites
);

module.exports = router;
