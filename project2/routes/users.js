const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.js");
const validation = require("../middleware/validateUsers.js");
const { isAuthenticated } = require("../middleware/authenticate");


router.get("/", usersController.getAllUsers);
router.get("/id/:id", usersController.getUserById);

router.post("/", isAuthenticated, validation.saveContacts, usersController.createUser);
router.put("/id/:id", isAuthenticated, validation.saveContacts, usersController.updateUser);

router.delete("/:id", isAuthenticated, usersController.deleteUser);

module.exports = router;
