const MongoClient = require("mongodb").MongoClient;
const config = require("./config.json");
const mongoose = require('mongoose')
var express = require("express");
var bodyParser = require('body-parser');

const port = 5000;
const DBURL = config.DBURL;
const client = new MongoClient(DBURL , { useNewUrlParser: true, useUnifiedTopology: true });
app = express();

const cors = require('cors');
app.use(bodyParser.json())
app.use(cors()); 
app.use(
  bodyParser.urlencoded({
    extended:false
  })
)

mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./routes/User');
app.use('/user', User);
 
const Listing = require('./routes/Listing');
app.use('/listing', Listing);

app.listen(port,function(){
  console.log('Server is running on port: ' + port);
});