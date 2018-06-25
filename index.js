const Koa = require('koa');
const Container = require('./src/container');

// Create Koa instance
const server = new Koa();

// Register Service Container
const app = new Container();

server.context.container = app;
server.context.make = app.make;

module.exports = server;
