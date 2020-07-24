/**
 * HTTP Routing definitions for the Vermont Covered Bridges Service
 * 
 * Steven Bergeron
 * July 2020
 */
module.exports = app => {
  const bridges = require("../controllers/bridge.controller.js");

  var router = require("express").Router();

  // Retrieve all bridge names/WGNs 
  router.get("/", bridges.findAllNames);

  // Retrieve verbose bridge info
  router.get("/verbose", bridges.findAll);

  // Retrieve bridges by County
  router.get("/county/:county", bridges.findByCounty);

  // Retrieve a single bridge
  router.get("/wgn/:wgn", bridges.findByWGN);

  app.use('/api/bridges', router);
};