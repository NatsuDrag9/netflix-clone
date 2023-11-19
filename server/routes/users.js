const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

// Update
router.put("/:id", verify, async (req, res) => {
  // Check whether user is account owner or admin
  if (req.user.id === req.params.id || req.user.isAdmin) {
    // Update password if password is sent
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Prevent unauthourized update
    res.status(403).json("You can update only your account");
  }
});

// Delete
router.delete("/:id", verify, async (req, res) => {
  // Check whether user is account owner or admin
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Prevent unauthourized delete
    res.status(403).json("You can delete only your account");
  }
});

// Get one user
router.get("/find/:id", async (req, res) => {
  // No user/admin check is required in GET
  try {
    const user = await User.findById(req.params.id);

    // Only sending the information other than password
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all users
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  // Only admin can see all users
  if (req.user.isAdmin) {
    try {
      // If query exists then return only the last 5 users
      // else return all users
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Prevent unauthourized delete
    res.status(403).json("You are not allowed to see all users");
  }
});

// Get user-stats
router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;