const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello from Project 1!");
});

module.exports = router;
