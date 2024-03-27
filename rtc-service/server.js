const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(cors({
  origin: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"]
  }
});

require('dotenv').config();


 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3013;


const sentMessages = new Set();

app.post('/send-text', (req, res) => {
  const text = req.body.text; 
  console.log('Texte transcrit reçu:', text);

  if (!sentMessages.has(text)) {
    io.emit('transcribedText', text); 
    sentMessages.add(text);
  } else {
    console.log('Le message a déjà été envoyé:', text);
  }

  res.status(200).send('Texte transcrit reçu avec succès.');
});
   
server.listen(PORT, () => {
  console.log(`Serveur Express en écoute sur le port ${PORT}`);
});
