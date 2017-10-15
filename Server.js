/*Simple web server based on 
http://expressjs.com/en/starter/hello-world.html
using node and express (npm install express in cd hackathon)
*/

//parameters
var sitePath = process.argv[2] || ".";
var port = 4242;

//express -> libraries
var express = require('express');
var app = express();

//request logging
app.use(function(req, res, next){
	console.log(req.url);
	next();
});

//start server
console.log(sitePath);
console.log("Starting server in: " + __dirname + '/' +sitePath);
app.use(express.static(__dirname + '/' + sitePath));
app.listen(port, function() {
	console.log("Server running at: http://localhost:" + port)
});

