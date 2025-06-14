const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.js");
const validation = require("../middleware/validateUsers.js");
const { isAuthenticated } = require("../middleware/authenticate");


router.get("/", usersController.getAllUsers);
router.get("/id/:id", validation.validateObjectId, validation.checkUserExists, usersController.getUserById);

router.post("/", isAuthenticated, validation.saveContacts, usersController.createUser);
router.put("/id/:id", isAuthenticated, validation.validateObjectId, validation.checkUserExists, validation.saveContacts, usersController.updateUser);

router.delete("/:id", isAuthenticated, validation.validateObjectId, validation.checkUserExists, usersController.deleteUser);

module.exports = router;
