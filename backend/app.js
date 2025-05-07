const express = require("express");
const app = express();
const router = express.Router();

const connectDB = require("./database/conection");

connectDB();

app.use("/", router);

router.get("/", (req, res) => {
  res.send("Hello World, This is the root route");
});

router.get("/home", (req, res) => {
  res.send("Hello World, This is home router");
});

router.get("/profile", (req, res) => {
  res.send("Hello World, This is profile router");
});

router.get("/login", (req, res) => {
  res.send("Hello World, This is login router");
});

router.get("/logout", (req, res) => {
  res.send("Hello World, This is logout router");
});

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Web Server is listening at port " + (process.env.PORT || 3000));
});

// In a similar way to application middleware, we can use router middleware.

// const express = require('express');
// const app = express();
// const router = express.Router();

// router.use((req, res, next) => {
//   console.log('Time:', Date.now());
//   next();
// });

// router.get('/home', (req, res) => {
//   res.send("ok");
// });

// app.use('/', router);

// app.listen(process.env.PORT || 3000, () => {
//   console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
// });

// catch errors
// app.use((err, req, res, next) => {
//   res.status(500).send("Something broke!");
// });
