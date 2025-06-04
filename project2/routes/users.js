const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.js");
const validation = require("../middleware/validateUsers.js");

router.get("/", usersController.getAllUsers);
router.get("/id/:id", usersController.getUserById);

router.post("/", validation.saveContacts, usersController.createUser);
router.put("/id/:id", validation.saveContacts, usersController.updateUser);

router.delete("/:id", usersController.deleteUser);

module.exports = router;
