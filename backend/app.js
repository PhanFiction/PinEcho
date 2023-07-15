const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');

app.use(
  cors({
    origin: config.PORT,
    methods:['GET','POST'],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.json());

app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.send('<h1>hello Wordl</h1>');
});

module.exports = app;