const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose')

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const monngodb_url="mongodb+srv://naveen-developer:rash47rash2021@naveen-developer.eja8d.mongodb.net/group44Database";

mongoose.connect(monngodb_url, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("Hi! MongoDB is connected Now ");
}).catch((error)=>{
    console.log("Sorry! MongoDB is not connected");
    console.log(error);
});



app.use('/', route);



app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});