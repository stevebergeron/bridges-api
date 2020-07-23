module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("articles", {
    wgn: Sequelize.STRING(15),
    seq: Sequelize.INTEGER,
    header: Sequelize.STRING(200),
    text: Sequelize.TEXT
  });

  return Article;
};