const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
  inventory: { type: Array, default: [] }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
