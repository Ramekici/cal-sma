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

dbConnect();

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
})



app.use("/images", express.static(path.join("images")));

//app.use("/", express.static(path.join(__dirname, "client/src")));

app.use(express.static(path.join(__dirname, 'public')));
//app.use(logger('dev')); //istek gönderildiğinde bilgileri yazar

app.use('/api/users', users);


// Server static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes  html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}





module.exports = app;
