const express = require('express');

const router = express.Router()
const axios = require('axios');
require('dotenv').config();

router.get("/games", async (req, res) => {
    try {
      console.log(req.query)
      const search = req.query.search || "";
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 40;
  
      // J'interroge le backend du reacteur en envoyant la clef API et les différents query
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.YOUR_API_KEY}&search=${search}&page=${page}&pageSize=${pageSize}`
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  });
  
  router.get("/games/:id", async (req, res) => {
    try {
      const { id } = req.params
      console.log(req.params)
  
      // J'interroge le backend du reacteur en envoyant la clef API et les différents query
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${process.env.YOUR_API_KEY}`
      );
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  });

  module.exports = router;