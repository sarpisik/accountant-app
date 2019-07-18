const express = require('express'),
  cors = require('cors'),
  server = express(),
  port = 9999,
  api = require('./routes/api');

server.use(cors());
server.use(api);
server.listen(port, () => console.log(`API on port ${port}`));
