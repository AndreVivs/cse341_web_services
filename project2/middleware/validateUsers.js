const Validator = require("validatorjs");
const mongoose = require("mongoose");
const User = require("../models/users");

const userRules = {
  firstName: "required|string",
  lastName: "required|string",
  email: "required|email",
  favoriteColor: "required|string",
  birthdate: "sometimes|date",
};

const saveContacts = (req, res, next) => {
  const validation = new Validator(req.body, userRules);

  if (validation.fails()) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: validation.errors.all() });
  }

  next();
};

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  next();
};

const checkUserExists = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.userFound = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking user existence", error: error.message });
  }
};

module.exports = {
  saveContacts,
  validateObjectId,
  checkUserExists,
};
