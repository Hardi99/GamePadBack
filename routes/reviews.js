const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());

// import des models reviews et user
const Reviews = require("../models/Reviews");
const User = require("../models/User");
// import du middleware
const isAuthenticaded = require("../middlewares/isAuthenticaded");

// POST A REVIEWS
router.post("/games/reviews", isAuthenticaded, async (req, res) => {
  const { title, reviews, _id, game_id, date } = req.body;
  // console.log("->", req.user);
  try {
    const existingReviews = await Reviews.findOne({
      game_id: game_id,
      author: req.user._id,
    });
    console.log("existing", existingReviews);
    if (existingReviews) {
      return res
        .status(400)
        .json({ error: "you already publish a reviews for this game, sorry." });
    } else {
      const newReviews = new Reviews({
        title: title,
        reviews: reviews,
        game_id: req.body.game_id,
        date: date,
        author: req.user,
      });
      await newReviews.save();
      res.status(200).json({
        title: newReviews.title,
        reviews: newReviews.reviews,
        game_id: newReviews.game_id,
        date: newReviews.date,
        author: newReviews.author,
      });
    }
  } catch (error) {
    console.log("error.message route post=>", error);
  }
});

// SEE ALL REVIEWS BY GAME ID
router.get("/allreviews/:id", async (req, res) => {
  const game_id = req.params.id;
  // console.log("gameID =>", game_id);
  // console.log("gameid-allreviews=>", game_id);
  try {
    if (game_id) {
      const allreviews = await Reviews.find({ game_id }).populate("author");
      res.status(200).json(allreviews);
      // console.log("allreviewsbygameID =>", allreviews); // Affiche les commentaires lié à l'id au jeu
    }
    // else {
    //   res.status(200).json("allreviews2 =>", allreviews);
    // }
  } catch (error) {
    console.log("error allreviews", error.message);
  }
});

// DELETE A REVIEWS

module.exports = router;