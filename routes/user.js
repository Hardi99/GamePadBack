const express = require("express");

const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// appel de mon Model
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, checkPassword } = req.body;
    if (password !== checkPassword) {
      res.status(400).json({ error: "Vos 2 mots de passe ne sont pas identiques" });
    }
    else if (username && email && password && checkPassword) {
      // si username email et password existent, alors je vérifie s'il ne sont pas déjà utilisé en base de donnée
      const usernameToFind = await User.findOne({ username: username });
      const emailToFind = await User.findOne({ email: email });
      if (usernameToFind || emailToFind) {
        res.status(400).json({ error: "email or user already exist" });
      } else {
        // je crypte mon mdp
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(16);

        const newUser = new User({
          username: username,
          email: email,
          hash: hash,
          salt: salt,
          token: token,
        });
        await newUser.save();
        res.status(200).json({ message: "compte créé" });
      }
    } else {
      res.status(400).json({ error: "Missing parameters" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* VOICI LA BONNE FAÇON DE FAIRE UN LOGIN !! A NE PAS OUBLIER */

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const userFound = await User.findOne({ email: email });
      
      if (userFound) {
          let newSaltedPassword = password + userFound.salt;
          let newHash = SHA256(newSaltedPassword).toString(encBase64);
  
          if (newHash === userFound.hash) {
            res.status(200).json(userFound);
          } else {
            console.log(newHash)
            res.status(400).json({ error: "Invalid email or password" });
          }
        } else if (!email || !password) {
          res.status(400).json({ error: "Missing parameters" });
        }
      } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;