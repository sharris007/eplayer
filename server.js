var express=require('express');
var app=express();
var bodyparser=require('body-parser');
// var connect=require('connect');
const route = require('./public/routes/list/list.route');

app.use(express.static(__dirname+"/public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/api',route);

app.listen(3000);
console.log("server running in port 3000");
