/**
 * The Bridge model for the Vermont Covered Bridge service
 * 
 * Steve Bergeron
 * July 2020
 */
module.exports = (sequelize, Sequelize) => {
  const Bridge = sequelize.define("bridges", {
    wgn: {
      type: Sequelize.STRING(15),
      allowNull: false,
      unique: true
    },
    name: Sequelize.STRING(200),
    county:  Sequelize.STRING(30),
    municipality: Sequelize.STRING(50),
    loc_desc: Sequelize.STRING(200),
    current_use: Sequelize.STRING(50),
    crosses: Sequelize.STRING(200),
    long: Sequelize.STRING(20),
    lat: Sequelize.STRING(20),
    built: Sequelize.STRING(10),
    length: Sequelize.STRING(10),
    truss: Sequelize.STRING(50),
    nhrp: Sequelize.STRING(20)
  });

  return Bridge;
};