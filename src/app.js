var Express = require("express");
var Mongoose = require("mongoose");
var BodyParser = require("body-parser");
var BlueBird = require("bluebird");

var app = Express();
var port = process.env.PORT || 4001;

function cors(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-Codingpedia, Authorization");
	res.header("Access-Control-Expose-Headers", "Authorization");

	next();	
}

app.use(cors);
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}));

app.use("/", Express.static(__dirname + "/exports"));

Mongoose.Promise = BlueBird;
Mongoose.connect('mongodb://localhost/monex-s02', loadFiles);

function loadFiles(error) {
	if (error) {
		console.log("Mongo error:", error);
	} else {
		var modules = ["user", "cat", "dog", "car", "task"];

		modules.forEach(function(module) {
			require("./" + module + "/" + module + ".router")(app, Mongoose);
		});

		console.log("Mongoose loaded")
	}
}

app.listen(port, function(error) {
	console.log(error ? error : "Listening on port " + port);
});