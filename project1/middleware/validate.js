const validator = require("../helpers/validate.js");
//const e = require("express");

const saveContacts = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    email: "required|email",
    favoriteColor: "required|string",
    birthdate: "optional|date",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(400).json({
        message: "Validation failed",
        errors: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContacts,
};

// Otra manera de validar los datos de entrada usando express-validator
// const { body, validationResult } = require("express-validator");
// {
//   const { firstName, lastName, email, favoriteColor, birthdate } = req.body;
//   if (!firstName || !lastName || !email) {
//     return res
//       .status(400)
//       .json({ message: "First name, last name, and email are required." });
//   }

//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ message: "Invalid email format." });
//   }

//   if (favoriteColor && !validator.isHexColor(favoriteColor)) {
//     return res
//       .status(400)
//       .json({ message: "Favorite color must be a valid hex color." });
//   }

//   if (birthdate && !validator.isDate(birthdate)) {
//     return res.status(400).json({ message: "Birthdate must be a valid date." });
//   }

//   next();
// }
