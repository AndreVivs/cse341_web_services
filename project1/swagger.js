const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API Contacts project1",
    description: "This API provide the information about contacts.",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
