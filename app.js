var Koa = require('koa');
var router = require('koa-router')();
var body_parser = require('koa-bodyparser');
var app  = new Koa();

console.log("The server is running!");

var add_controllers = require('./add.js');
add_controllers(router);

app.use(body_parser());
app.use(router.routes());

app.listen(8080);