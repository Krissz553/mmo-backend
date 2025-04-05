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
