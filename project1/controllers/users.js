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
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  const userId = new ObjectId(id);
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

createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };

  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .insertOne(user);
    res
      .status(201)
      .json({ message: "User created", userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

updateUser = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  const userId = new ObjectId(id);
  const userUpdates = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };

  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .updateOne({ _id: userId }, { $set: userUpdates });

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  const userId = new ObjectId(id);
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
