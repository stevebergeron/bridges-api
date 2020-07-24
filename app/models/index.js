/**
 * The db setup for the Vermont Covered Bridge service
 * 
 * Steve Bergeron
 * July 2020
 */const dbConfig = require("../config/local.db.config.js");

const Sequelize = require("sequelize");
var sequelize = null;

if (process.env.DATABASE_URL) {
  // the application is depolyed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
  })
} else {
  // the application is deployed on the local machine ... use local db
  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bridges = require("./bridge.model.js")(sequelize, Sequelize);
db.photos = require("./photo.model.js")(sequelize, Sequelize);
db.articles = require("./article.model.js")(sequelize, Sequelize);

module.exports = db;