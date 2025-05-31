const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  res.send("Hello from Project 1!");
});

router.use("/users", require("./users"));

module.exports = router;
