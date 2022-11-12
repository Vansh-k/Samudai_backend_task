const client = require("../../database");

async function textChange(req, res) {
  heading = req.body.heading;
  desc = req.body.desc;
  dash_id = req.body.dash_id;

  // Updating the static data
  client.query(
    `UPDATE stData SET discription = $1, head = $2`,
    [desc, heading],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("dashboard/" + dash_id);
      }
    }
  );
}

module.exports = textChange;
