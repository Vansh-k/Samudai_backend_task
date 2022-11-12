const { Client } = require("pg");

const client = new Client({
  user: "obmvzvun",
  host: "satao.db.elephantsql.com",
  database: "obmvzvun",
  password: "W_O7tHFxEjkHNnEXlL0OrjpMhAX9FpiW",
  port: 5432,
});

module.exports = client;
