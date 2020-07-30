/**
 * The db controller for the Vermont Covered Bridge service
 * TODOs:
 *  - expose more API endpoints (make it truly RESTful)
 * 
 * Steve Bergeron
 * July 2020
 */
const db = require("../models");
const Bridge = db.bridges;
const Article = db.articles;
const Photo = db.photos;
const Op = db.Sequelize.Op;

// Send all bridge names and WGNs in an array of objects
exports.findAllNames = (req, res) => {
  Bridge
    .findAll({
      attributes: ['name', 'wgn'],
      order: [['name', 'ASC']]})
    .then(bridges => { 
      if (!bridges.length) res.status(204).send() 
      else res.send(bridges)
     })
    .catch(err => handleError(res, err));
}

// Send ALL Bridge/Article/Photo data from the database
// This won't ever be used by *my* client site (I don't think) but it's
// good to have this option for debugging, plus as a RESTful service,
// I will want to serve all this anyway
exports.findAll = (req, res) => {
  const findBridges = Bridge.findAll();
  const findArticles = Article.findAll();
  const findPhotos = Photo.findAll();

  Promise.all([findBridges, findArticles, findPhotos])
    .then(([bridges, articles, photos]) => {
      if (!bridges.length) res.status(204).send() 
      else res.send({ bridges, articles, photos });
    })
    .catch(err => handleError(res, err));
};

// Send all bridges for a county
// This will send just the bridge info, not the articles or photo links
exports.findByCounty = (req, res) => {
  const county = req.params.county;
  var condition = county ? { county: { [Op.iLike]: `%${county}%` } } : null;

  Bridge.findAll({ where: condition })
    .then(data => { 
      if (!data.length) res.status(204).send() 
      else res.send(data);
     })
    .catch(err => handleError(res, err));
};

// Send all bridge names and WGNs for all counties in format suitable
// to be consumed as a page menu
exports.findAllForEachCounty = (req, res) => {
  Bridge
    .findAll({
      attributes: ['county', 'name', 'wgn'],
      order: [['county','ASC'],['name','ASC']],
      
    })
    .then(bridges => { 
      if (!bridges.length) res.status(204).send() 
      else {
        let currentCounty = "";
        let menuitems = [];
        let submenuitems = [];
        
        bridges.forEach(bridge => {
          // same county
          if (bridge.county === currentCounty) {
            submenuitems.push({
              'name': bridge.name,
              'wgn': bridge.wgn
            })
          
          // different county  
          } else {
            if (submenuitems.length > 1) {
              menuitems.push({
                'name': currentCounty,
                'children': submenuitems
              })
              submenuitems = []
            }
            currentCounty = bridge.county
            submenuitems.push({
              'name': bridge.name,
              'wgn': bridge.wgn
            })
          }
        })
        // final push
        menuitems.push({
          'name': currentCounty,
          'children': submenuitems
        })
        res.send({ 'data': menuitems })
      }
     })
    .catch(err => handleError(res, err));
}

// Send data for a single bridge by WGN, along with articles and photos
// articles and photos will be sorted by a sequence numbers so they can
// be displayed in the desired order
exports.findByWGN = (req, res) => {
  const wgn = req.params.wgn;
  var condition = wgn ? { wgn: { [Op.iLike]: `%${wgn}%` } } : null;

  const findBridges = Bridge.findAll({ where: condition });
  const findArticles = Article.findAll({ where: condition, order: [['seq', 'ASC']]});
  const findPhotos = Photo.findAll({ where: condition, order: [['seq', 'ASC']]});

  Promise.all([findBridges, findArticles, findPhotos])
    .then(([bridges, articles, photos]) => {
      if (!bridges.length) res.status(204).send() 
      else res.send({ bridges, articles, photos });
    })
    .catch(err => handleError(res, err));
};

const handleError = (res, err) => {
  res.status(500).send({
    message: err.message || "Some error occurred while retrieving data"
  });
}