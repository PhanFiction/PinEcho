const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
var server = http.createServer(app);
const cookieParser = require('cookie-parser');
const socketService = require('./services/socket');
const cookie = require('cookie');
const config = require('./utils/config');

app.use(
  cors({
    origin: config.PORT,
    methods:['GET','POST'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.set("views", __dirname);

app.use('/', roomRoutes);

module.exports = {
  server
}