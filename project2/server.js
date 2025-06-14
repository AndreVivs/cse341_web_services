const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv").config();
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const User = require("./models/users.js");

app
  .use(express.json())
  // express session initialization
  .use(

    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    }
  })
  )
  // Passport initialization
  .use(passport.initialize())
  .use(passport.session())
  // Enable CORS for all routes
  .use(cors({
  origin: "https://project2-sy4v.onrender.com",
  credentials: true,
}))

  .use("/", require("./routes/index.js"));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      withCredentials: true
    }
  })
);

app.use((req, res, next) => {
  console.log("➡️ Authenticated?", req.isAuthenticated());
  console.log("➡️ Session user:", req.user);
  console.log("➡️ Passport user:", req.user);
  next();
});


  // Passport GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in the database
        const existingUser = await User.findOne({ githubId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          githubId: profile.id,
          displayName: profile.displayName,
          username: profile.username,
          profileUrl: profile.profileUrl,
          email: profile.emails?.[0]?.value || '',
          avatar: profile.photos?.[0]?.value || ''
        });

        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


// Mongoose connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error("Mongoose connection error:", err));
