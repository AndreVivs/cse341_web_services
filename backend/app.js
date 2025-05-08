const express = require("express");
const mongodb = require("./db/connect");
const professionalRoutes = require("./routes/professional");

const port = process.env.PORT || 8080;
const app = express();

app
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
  .use("/professional", professionalRoutes);

// Agregar una ruta raíz para probar el servidor
app.get("/", (req, res) => {
  res.send("Server is running!");
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
