const express = require("express"); // import du package express
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

const User = require("../models/User");
///SEE ALL FAV
router.post("/allfavorites", async (req, res) => {
  const { token } = req.body;
  try {
    //Users in bdd
    const Users = await User.findOne({
      token: token,
    });
    console.log("UserFind", Users);
    const favoriteGame = Users.favoriteGame;
    console.log("favoritesSave", favoriteGame);
    res.status(200).json(favoriteGame);
  } catch (error) {
    res.status(406).json({ message: error });
  }
});

///ADD FAV
router.post("/favorite", async (req, res) => {
  const { favorite, token } = req.body;
  //   console.log("favoriteroute", favorite);
  //   console.log(req.body);
  try {
    //Search Users with token
    const Users = await User.findOne({
      token: token,
    });
    // console.log("User", Users);
    const favGame = Users.favoriteGame;
    // console.log("favGame", favGame);
    //if empty ? push
    if (favGame.length === 0) {
      //   console.log("favoritepush", favorite);
      Users.favoriteGame.push(favorite);
      Users.save();
    } else {
      const pushing = () => {
        Users.favoriteGame.push(favorite);
        Users.save();
      };
      //if id exist
      const isFound = favGame.some((element) => {
        console.log(element);
        if (element.id === favorite.id) {
          return true;
        }
      });
      // if ID found no push
      {
        isFound ? null : pushing();
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.response });
  }
});

// ///DELETE
// router.put("/deletefavorite", async (req, res) => {
//   const { gameId, token } = req.body;
//   try {
//     const Users = await User.findOne({
//       token: token,
//     });
//     const favoriteArray = Users.favorites;

//     favoriteArray.splice(
//       favoriteArray.findIndex((a) => a.id === gameId),
//       1
//     );

//     Users.save();
//     res.status(200).json(favoriteArray);
//   } catch (error) {
//     res.status(406).json({ message: error });
//   }
// });

module.exports = router;