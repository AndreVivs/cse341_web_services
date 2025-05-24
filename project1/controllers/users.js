const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

getAllUsers = async (req, res) => {
  try {
    const users = await mongodb
      .getDb()
      .db()
      .collection("users")
      .find()
      .toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

getUserById = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
    const user = await mongodb
      .getDb()
      .db()
      .collection("users")
      .findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
};
