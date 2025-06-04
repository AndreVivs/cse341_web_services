const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  res.send("Hello from inventory store Project 2!");
});

router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/addtofavorites", require("./relation"));

module.exports = router;
