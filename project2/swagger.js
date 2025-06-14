const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API inventory project2",
    description:
      "This API provide the information about the products in the store and their details.",
  },
  host: "project2-sy4v.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
