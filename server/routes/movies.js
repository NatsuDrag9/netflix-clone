const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
  // Check whether user isadmin
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);

    try {
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Prevent unauthourized movie creation
    res.status(403).json("You are not authorized to create a movie");
  }
});

// Update
router.put("/:id", verify, async (req, res) => {
  // Check whether user isadmin
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Prevent unauthourized update
    res.status(403).json("You are not authorized to update your movie");
  }
});

// Delete
router.delete("/:id", verify, async (req, res) => {
  // Check whether user isadmin
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Prevent unauthourized update
    res.status(403).json("You are not authorized to delete this movie");
  }
});

// Get
router.get("/find/:id", async (req, res) => {
  // Any user can get the movie
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get random
router.get("/random", async (req, res) => {
  // Any user can get a random the movie/series
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all
router.get("/", verify, async (req, res) => {
    // Check whether user isadmin
    if (req.user.isAdmin) {
      try {
        const movies = await Movie.find();
        res.status(200).json(movies.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      // Prevent unauthourized update
      res.status(403).json("You are not authorized to get all the movies");
    }
  });

module.exports = router;
