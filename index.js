require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.set("view engine", "ejs");

// database connection
const client = require("./database.js");

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Data logging initiated!");
  }
});

const userTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    phonenumber text NOT NULL UNIQUE,
    password varchar NOT NULL,
    roll text NOT NULL
  );
  `;

client.query(userTable, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log("table created!");
  }
});

const dashboardTable = `
  CREATE TABLE IF NOT EXISTS dashboard (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    dash_type text
  );
  `;

client.query(dashboardTable, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log("table created!");
  }
});

const staticDataTable = `
  CREATE TABLE IF NOT EXISTS stData (
    id INTEGER PRIMARY KEY,
    discription text,
    head text
  );
  `;

client.query(staticDataTable, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log("table created!");
  }
});

// const insertStaticdata = `INSERT INTO stData (id, discription, head)
// VALUES (1,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem optio autem nobis quidem assumenda esse sunt numquam ipsam dolor ullam fuga, ea corporis consequatur natus excepturi est eum minima blanditiis.','Section which only admin and editor can edit!');`;
// client.query(insertStaticdata, (err, res) => {
//   if (err) {
//     console.log(err.stack);
//   } else {
//     console.log("data inserted successfully!");
//   }
// });

app.get("/", (req, res) => {
  res.render("/index");
});

const textChangeRoute = require("./cons_material/routes/textChangeRoute");
app.use(textChangeRoute);

const accessChangeRoute = require("./cons_material/routes/accessChangeRoute");
app.use(accessChangeRoute);

const NewsAPIRoute = require("./cons_material/routes/NewsAPIRoute");
app.use(NewsAPIRoute);

const registerPageRoute = require("./cons_material/routes/registerPageRoute");
app.use(registerPageRoute);

const loginPageRoute = require("./cons_material/routes/loginPageRoute");
app.use(loginPageRoute);

const signupRoute = require("./cons_material/routes/signupRoute");
app.use(signupRoute);

const loginRoute = require("./cons_material/routes/loginRoute");
app.use(loginRoute);

const dashboardRoute = require("./cons_material/routes/dashboardRoute");
app.use(dashboardRoute);

const port = process.env.PORT || 3000;

app.listen(process.env.PORT || "3000", () => {
  console.log("Server Running On Port 3000");
});
