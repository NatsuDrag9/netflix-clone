const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
  // Check whether user isadmin
  if (req.user.isAdmin) {
    const newList = new List(req.body);

    try {
      const savedList = await newList.save();
      res.status(200).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Prevent unauthourized list creation
    res.status(403).json("You are not authorized to create a list");
  }
});

// Delete
router.delete("/:id", verify, async (req, res) => {
  // Check whether user isadmin
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("The has been successfully deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Prevent unauthourized list creation
    res.status(403).json("You are not authorized to delete a list");
  }
});

// Get list for home page
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      // In homepage and get random list
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
