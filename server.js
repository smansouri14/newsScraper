 //Requiring our dependencies
 var express = require("express");
 var mongoose = require("mongoose");
 var expressHandle = require("express-handlebars");
 var bodyParser = require("body-parser");

// PORT set up for heroku or port 8080
 var PORT = process.env.PORT || 8080;

 var app = express();

 var router = express.Router();

 require("./config/routes")(router);

 app.use(express.static(__dirname + '/public'));


 //connects handlebars
app.engine("handlebars", expressHandle({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Helps us use body parser
 app.use(bodyParser.urlencoded({
     extended: false
 }));

 app.use(router);

 //use deployed or local like our server but for db
 var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

 //this connects mongoose to the db
 mongoose.connect(db, function(error) {
     //if it can't connect throw an error
    if (error) {
         console.log(error);
     }
     //otherwise say its successful
     else {
         console.log("mongoose connection is successful");
     }
 });

 //listening on PORT
 app.listen(PORT, function() {
     console.log("Listening on: " + PORT);
    
 });