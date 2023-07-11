const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
var server = http.createServer(app);
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const validateServices = require('./utils/validate');

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

app.use('/', validateServices.validateIncomingRequest, authRoutes);

module.exports = {
  server
}