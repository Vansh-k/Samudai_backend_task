const express = require("express");
const router = express.Router();
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("dfb6477b251e42d592ca2016bbf0a2b1");
const client = require("../../database");

router.post("/dashboard/:id", async (req, res) => {
  const id = req.params.id;
  var con = req.body.country;
  const name = req.body.name;
  const dash_type = req.body.dash_type;
  
  if (con == undefined || con == "") {
    con = "in";
  }

  // All Users and Editor data for access change
  var uedata = [];
  if (dash_type == "Admin") {
    const users = await client.query(
      `SELECT * FROM users where roll=$1 OR roll=$2`,
      ["Editor", "User"]
    );
    uedata = users;
  }

  // Standard data
  const stData = await client.query(`SELECT * FROM stData where id = $1`, [1]);
  console.log(stData);

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
        stData: JSON.stringify(stData),
      });
    });
  // }
});

module.exports = router;
