const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URI, {})
    .then((client) => {
      _db = client.db(); // <- aquí guardas directamente la DB
      console.log("Successfully connected to MongoDB.");
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
