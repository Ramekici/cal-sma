const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
var logger = require('morgan');
require("dotenv").config();
const dbConnect = require("./models/dbConnect");


const users = require('./routes/users');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
})

dbConnect();

app.use("/images", express.static(path.join("images")));

//app.use("/", express.static(path.join(__dirname, "client/src")));

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev')); //istek gönderildiğinde bilgileri yazar


if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build')) 
}

app.use('/api/users', users);



module.exports = app;
