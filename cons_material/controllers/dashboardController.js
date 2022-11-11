const client = require("../../database");

async function dashboard(req, res) {
  const id = req.params.id;
  try {
    const data = await client.query(`SELECT * FROM dashboard WHERE id= $1;`, [
      id,
    ]);
    const dashboard = data.rows;

    if (dashboard.length === 0) {
      res.status(400).json({
        error: "User is not registered, Sign Up first",
      });
    } else {
      const userdata = await client.query(`SELECT * FROM users WHERE id= $1;`, [
        dashboard[0].user_id,
      ]);

      var uedata = [];
      if (dashboard[0].dash_type == "Admin") {
        const users = await client.query(
          `SELECT * FROM users where roll=$1 OR roll=$2`,
          ["Editor", "User"]
        );
        uedata = users;
      }

      res.render("dashboard", {
        dash_type: dashboard[0].dash_type,
        dash_id: id,
        data: JSON.stringify([]),
        name: userdata.rows[0].name,
        uedata: JSON.stringify(uedata),
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!",
    });
  }
}

module.exports = dashboard;
