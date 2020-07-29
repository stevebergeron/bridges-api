/**
 * The Photo model for the Vermont Covered Bridge service
 * TODOs:
 *  - think about adding columns for photo date and caption information
 * 
 * Steve Bergeron
 * July 2020
 */
module.exports = (sequelize, Sequelize) => {
  const Photo = sequelize.define("photos", {
    wgn: Sequelize.STRING(30),
    seq: Sequelize.INTEGER,
    link: Sequelize.STRING(200),
    date_taken: Sequelize.STRING(25),
    caption: Sequelize.STRING(300)
  });

  return Photo;
};