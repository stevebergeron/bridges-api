/**
 * HTTP Routing definitions for the Vermont Covered Bridges Service
 * 
 * Steven Bergeron
 * July 2020
 */
module.exports = app => {
  const bridges = require("../controllers/bridge.controller.js");

  var router = require("express").Router();
  
  // handle CORS problems
  router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });

  // Retrieve all bridge names/WGNs 
  router.get("/", bridges.findAllNames);

  // Retrieve verbose bridge info
  router.get("/verbose", bridges.findAll);

  // Retrieve bridges by County
  router.get("/county/:county", bridges.findByCounty);

  // Retrieve bridges for all Counties
  router.get("/allcounties", bridges.findAllForEachCounty);

  // Retrieve a single bridge
  router.get("/wgn/:wgn", bridges.findByWGN);

  app.use('/api/bridges', router);
};