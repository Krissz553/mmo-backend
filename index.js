const express = require('express');
const mongoose = require('mongoose');
const Player = require('./models/Player'); // Importáljuk a Player modellt

const app = express();
app.use(express.json()); // A JSON body-t olvasó middleware

const PORT = process.env.PORT || 3000;

// Játékos létrehozása
app.post('/players', async (req, res) => {
  try {
    const { name } = req.body;
    const newPlayer = new Player({ name });
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(500).json({ message: 'Hiba a játékos létrehozása közben.' });
  }
});

// Játékos lekérése
app.get('/players/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Játékos nem található.' });
    }
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ message: 'Hiba a játékos lekérése közben.' });
  }
});

// Ha minden rendben van
app.listen(PORT, () => {
  console.log(`Szerver fut a ${PORT} porton.`);
});
