const db = require("../models");
const { text } = require("body-parser");
const Bridge = db.bridges;
const Article = db.articles;
const Photo = db.photos;
const Op = db.Sequelize.Op;

// Retrieve all bridge names
exports.findAllNames = (req, res) => {
  Bridge.findAll({
    attributes: ['name', 'wgn'],
    order: [['name', 'ASC']]})
    .then(bridges => {
      res.send(bridges)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data"
      });
    });
}

// Retrieve ALL Bridge/Article/Photo data from the database
// This won't ever be used by my client site (I don't think) but it's
// good to have this option for debugging... with a very large database
// this could be CPU intensive
exports.findAll = (req, res) => {
  const findBridges = Bridge.findAll();
  const findArticles = Article.findAll();
  const findPhotos = Photo.findAll();

  Promise.all([findBridges, findArticles, findPhotos])
    .then(([bridges, articles, photos]) => {
      res.send({ bridges, articles, photos });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data"
      });
    });

};

// Retrieve all Bridges for a county
// This will return just the bridge info, not the articles or photo links
// Useful for displaying a list to drill down into
exports.findByCounty = (req, res) => {
  const county = req.params.county;
  var condition = county ? { county: { [Op.iLike]: `%${county}%` } } : null;

  Bridge.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data"
      });
    });
};

// Find a single Bridge by WGN, along with articles and photos
exports.findByWGN = (req, res) => {
  const wgn = req.params.wgn;
  var condition = wgn ? { wgn: { [Op.iLike]: `%${wgn}%` } } : null;

  const findBridges = Bridge.findAll({ where: condition });
  const findArticles = Article.findAll({ where: condition, order: [['seq', 'ASC']]});
  const findPhotos = Photo.findAll({ where: condition, order: [['seq', 'ASC']]});

  Promise.all([findBridges, findArticles, findPhotos])
    .then(([bridges, articles, photos]) => {
      res.send({ bridges, articles, photos });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data"
      });
    });

};
