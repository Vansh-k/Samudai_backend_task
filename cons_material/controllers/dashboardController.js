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
      res.render("dashboard", {dash_type : dashboard[0].dash_type});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!",
    });
  }
}

module.exports = dashboard;
