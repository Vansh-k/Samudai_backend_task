const bcrypt = require("bcrypt");
const { query } = require("express");
const client = require("../../database");

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]); //Verifying if the user exists in the database
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        error: "User is not registered, Sign Up first",
      });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: "Server error",
          });
        } else if (result === true) {

          client.query(
            `SELECT * FROM dashboard WHERE user_id = $1`,
            [user[0].id],
            (err, dashData) => {
              if (err) {
                console.error(err);
                return res.status(500).json({
                  error: "Database error",
                });
              } else {
                res.redirect("/dashboard/" + dashData.rows[0].id);
              }
            }
          );
        } else {
          if (result != true)
            res.status(400).json({
              error: "Enter correct password!",
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!",
    });
  }
}

module.exports = login;
