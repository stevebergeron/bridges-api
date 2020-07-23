module.exports = (sequelize, Sequelize) => {
  const Photo = sequelize.define("photos", {
    wgn: Sequelize.STRING(15),
    seq: Sequelize.INTEGER,
    link: Sequelize.STRING(200)
  });

  return Photo;
};