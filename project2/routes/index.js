const passport = require("passport");
const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/login", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
  }),
  (req, res) => {
    console.log("Login success, user:", req.user);
    res.redirect("https://project2-sy4v.onrender.com/?login=success");
  }
);

router.get("/", (req, res) => {
  const user = req.user;
  const { login, logout } = req.query;

  if (login === "success" && user) {
    return res.send(`👋 Welcome, ${user.displayName}! You are logged in.`);
  }

  if (logout === "success") {
    return res.send("👋 Goodbye! Your session has been closed.");
  }

  res.send(user ? `Logged in as ${user.displayName}` : "👋 Welcome guest! Please log in to access your account.");
});

router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/addtofavorites", require("./relation"));

// Ruta de logout
router.get("/logout", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("https://project2-sy4v.onrender.com/?logout=success");
  }

  // Eliminar la sesión del usuario
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("https://project2-sy4v.onrender.com/?logout=success");
  });
});

module.exports = router;
