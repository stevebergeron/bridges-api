/**
 * Server for The Vermont Covered Bridges Service
 * 
 * Steve Bergeron 
 * July 2020
 */
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// base route... will include full documentation at a later time when everything is done
app.get("/", (req, res) => {
  res.json({ message: "You have reached an API server for Vermont Covered Bridges.  More documentation to follow." });
});

// sync db to models
const db = require("./app/models");
db.sequelize.sync();

require("./app/routes/bridge.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});