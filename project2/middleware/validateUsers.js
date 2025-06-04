const Validator = require("validatorjs");

const userRules = {
  firstName: "required|string",
  lastName: "required|string",
  email: "required|email",
  favoriteColor: "required|string",
  birthdate: "date",
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

module.exports = { saveContacts };
