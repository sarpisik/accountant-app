require('dotenv').config();
const express = require('express'),
  server = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  helmet = require('helmet'),
  compression = require('compression');

// Database connection setup
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});
const mongooseConnection = mongoose.connection;
mongooseConnection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);

server.use(helmet()); // protect against well known vulnerabilitiesSection.
server.use(logger('dev'));
server.use(express.json());
server.use(compression()); //Compress all routes
server.use(express.urlencoded({ extended: false }));
module.exports = server;
