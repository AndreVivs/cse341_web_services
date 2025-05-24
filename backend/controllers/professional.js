const mongodb = require("../db/connect");

const getData = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("myProfessionalInfo")
      .find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0].user || {});
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ message: "Error retrieving data" });
  }
};

module.exports = { getData };
