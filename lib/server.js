'use strict';

const Hapi = require('hapi');
const registerPlugins = require('./plugins');

function startServer() {
  const server = new Hapi.Server();

  server.connection({
    port: process.env.PORT || 5000
  });

  return registerPlugins(server).then(() => {
    return server.start();
  }).then(() => {
    return server;
  });
}

module.exports = startServer;
