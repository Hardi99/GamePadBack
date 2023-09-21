const mongoose = require('mongoose'); // import du package mongoose
const express = require("express"); // import du package express
const cors = require('cors'); // import du package cors
const axios = require('axios');

const app = express(); // création du serveur

app.use(express.json());
app.use(cors());

require('dotenv').config();

// DB setup
mongoose.connect(process.env.MONGODB_URI)

const gamesRoutes = require('./routes/games')
const userRoutes = require('./routes/user')

app.use(gamesRoutes);
app.use(userRoutes);

app.get("/platforms", async (req, res) => {
  try {
    console.log(req.params)
    const id = req.params.id || "";

    // J'interroge le backend du reacteur en envoyant la clef API et les différents query
    const response = await axios.get(
      `https://api.rawg.io/api/platforms?key=${process.env.YOUR_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur est survenue" });
  }
});

// En utilisant la syntaxe ||, la partie front du suite peut accéder aux données en dev ou en prod sans avoir à changer le port à tout moment.

app.listen(process.env.PORT || 3000, () => { // Mon serveur va écouter le port 3000
  console.log("Server has started"); // Quand je vais lancer ce serveur, la callback va être appelée
});