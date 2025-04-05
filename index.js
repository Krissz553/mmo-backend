require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB kapcsolódás
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB kapcsolódva!'))
.catch((err) => console.error('❌ MongoDB hiba:', err));

// Teszt route
app.get('/', (req, res) => {
  res.send('MMO backend él és működik!');
});

// Indítás
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Szerver fut a ${PORT} porton`);
});

const express = require('express');
const mongoose = require('mongoose');
const Player = require('./models/Player'); // Importáljuk a Player modellt

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
