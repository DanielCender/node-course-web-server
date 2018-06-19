const fs = require("fs");
const express = require("express");
const hbs = require("hbs");

var app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", hbs); // Set the Handlebars view Engine for HTML templates

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile("server.log", log + "\n", err => {
		if (err) {
			console.log("Unable to append to server log.");
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render("maintenance.hbs");
// 	// Doesn't call next, so nothing else gets executed
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
	return text.toUpperCase();
});

app.get("/", (req, res) => {
	// res.send("<h1>Hello Express</h1>");
	res.render("index.hbs", {
		pageTitle: "Home Page",
		welcomeMessage: "Hello, welcome to my web Server!",
	});
});

app.get("/about", (req, res) => {
	res.render("about.hbs", {
		pageTitle: "About Page",
	});
});

app.get("/bad", (req, res) => {
	res.send({
		errorMessage: "Unable in handle the request",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
