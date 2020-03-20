const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date();

  console.log(`A ${method} request to ${url} occurred at ${timestamp}.`);
  next();
}

module.exports = server;