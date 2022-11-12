const bcrypt = require("bcrypt");
const client = require("../../database");

async function SignUp(req, res) {
  const { name, email, phonenumber, password, roll } = req.body;
  try {
    const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]);

    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "Server error",
          });
        const user = {
          name,
          email,
          phonenumber,
          password: hash,
          roll,
        };

        //Inserting data into the database

        client.query(
          `INSERT INTO users (name, email, phonenumber, password, roll) VALUES ($1,$2,$3,$4,$5) RETURNING *;`,
          [user.name, user.email, user.phonenumber, user.password, user.roll],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                error: "Database error",
              });
            } else {
              client.query(
                `INSERT INTO dashboard (user_id, dash_type) VALUES ($1, $2)RETURNING *;`,
                [result.rows[0].id, result.rows[0].roll],
                (err, data) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).json({
                      error: "Database error",
                    });
                  } else {
                    res.redirect("/dashboard/" + data.rows[0].id);
                  }
                }
              );
            }
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registring user!", //Database connection error
    });
  }
}

module.exports = SignUp;
