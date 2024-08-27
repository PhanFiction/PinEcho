const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const pinRoutes = require('./routes/pinRoutes');
const mongoose = require('mongoose');

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '.next/static')));

// Serve the Next.js index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '.next', 'index.html'));
});

const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

app.use(bodyParser.json({limit:'50mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'})); 

mongoose.connect(config.databaseURL)
  .then(() => console.log('Connected to database'));
  
app.use(express.json());

app.use('/', authRoutes);
app.use('/pins', pinRoutes);

module.exports = app;