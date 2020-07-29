/**
 * The Article model for the Vermont Covered Bridge service
 * 
 * Steve Bergeron
 * July 2020
 */
module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("articles", {
    wgn: Sequelize.STRING(30),
    seq: Sequelize.INTEGER,
    header: Sequelize.STRING(200),
    text: Sequelize.TEXT
  });

  return Article;
};