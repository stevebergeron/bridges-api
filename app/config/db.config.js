module.exports = {
  HOST: "localhost",
  USER: "bridges_read_only",
  PASSWORD: "password",
  DB: "bridges",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};