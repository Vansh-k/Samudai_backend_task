const express = require("express");
const router = express.Router();
const client = require("../../database");

router.post("/change", async (req, res) => {
  user_id = req.body.user_id;
  user_roll = req.body.user_roll;
  dash_id = req.body.dash_id;
  if (user_roll == "Editor") {
    client.query(
      `UPDATE users
        SET roll = $1
        WHERE id=$2;`,
      ["User", user_id],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      }
    );
    client.query(
      `UPDATE dashboard
        SET dash_type = $1
        WHERE user_id=$2;`,
      ["User", user_id],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      }
    );
  } else {
    client.query(
      `UPDATE users
        SET roll = $1
        WHERE id=$2;`,
      ["Editor", user_id],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      }
    );
    client.query(
      `UPDATE dashboard
        SET dash_type = $1
        WHERE user_id=$2;`,
      ["Editor", user_id],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      }
    );
  }

  res.redirect("/dashboard/" + dash_id);
});

module.exports = router;
