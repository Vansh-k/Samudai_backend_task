const express = require("express");
const router = express.Router();
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("dfb6477b251e42d592ca2016bbf0a2b1");
const client = require("../../database");

router.post("/dashboard/:id", (req, res) => {
  const id = req.params.id;

  var con = req.body.country;
  const name = req.body.name;
  const dash_type = req.body.dash_type;
  console.log(con);
  if(con == undefined){
    con = "in";
  }
  var uedata = [];
  if (dash_type == "Admin") {
    client.query(
      `SELECT * FROM users where roll=$1 OR roll=$2`,
      ["Editor", "User"],
      (err, users) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(users);
          uedata = users;
          newsapi.v2
            .topHeadlines({
              country: con,
            })
            .then((response) => {
              const data = JSON.stringify(response);
              res.render("dashboard", {
                dash_type: dash_type,
                dash_id: id,
                data: data,
                name: name,
                uedata: JSON.stringify(uedata),
              });
            });
        }
      }
    );
  } else {
    newsapi.v2
      .topHeadlines({
        country: con,
      })
      .then((response) => {
        const data = JSON.stringify(response);
        res.render("dashboard", {
          dash_type: dash_type,
          dash_id: id,
          data: data,
          name: name,
          uedata: JSON.stringify(uedata),
        });
      });
  }
});

module.exports = router;
