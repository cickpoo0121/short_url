const express = require("express");
const bodyParser = require("body-parser");
const con = require("./config/db");
const shortId = require("shortid");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const app = express();

// handel cors
app.use(
  cors({
    origin: "http://localhost:8080",
    // optionsSuccessStatus: 200,
    // origin: "http://localhost:8080",
    // allowedHeaders: [
    //   "Content-Type",
    //   "Authorization",
    //   "Access-Control-Allow-Methods",
    //   "Access-Control-Request-Headers",
    // ],
    // credentials: true,
    // enablePreflight: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// generate short url
app.post("/shorturl", async (req, res) => {
  let { fullUrl } = req.body;
  let genShortId = shortId.generate();
  try {
    // insert short url
    let insertShortUrl =
      "INSERT INTO `url` (`url_full`, `url_short`) VALUES (?,?);";

    if (fullUrl.substring(0, 4) !== "http") {
      throw { msg: "url not collect", status: 400 };
    }

    await con.query(insertShortUrl, [fullUrl, genShortId], (err) => {
      if (err) {
        console.log(err);
        throw { msg: "Internal Server Error", status: 500 };
      }
    });

    res
      .status(200)
      .json({ shorturl: `${req.headers.host}/${genShortId}`, status: 200 });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send(error.msg || "Internal Server Error");
  }
});

// redirect url
app.get("/:id", async (req, res) => {
  // console.log(req.headers);
  const { id } = req.params;
  // console.log("========>", id);
  try {
    let queryFullUrl = "SELECT * FROM `url` WHERE url_short = ?";

    let [fullUrl] = await con.query(queryFullUrl, [id], (err) => {
      if (err) {
        console.log(err);
        throw { msg: "Internal Server Error", status: 500 };
      }
    });

    if (fullUrl.length === 0) {
      throw { msg: "No data", status: 400 };
    }

    let updateClick = "UPDATE `url` SET `clicked` = ? WHERE `url_id` = ?";
    await con.query(
      updateClick,
      [fullUrl[0].clicked + 1, fullUrl[0].url_id],
      (err) => {
        if (err) {
          console.log(err);
          throw { msg: "Internal Server Error", status: 500 };
        }
      }
    );

    res.redirect(fullUrl[0].url_full);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send(error.msg || "Internal Server Error");
  }
});

// login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // query user for check in system
    const querUser = "SELECT * FROM `user` WHERE user_name=?";
    const [[user]] = await con.query(querUser, [username]).catch((err) => {
      if (err) {
        console.log(err);
        throw { msg: "Internal Server Error", status: 500 };
      }
    });

    // user not found
    if (!user) {
      console.log("user not found");
      throw { msg: "Invalid username of password", status: 400 };
    }
    // console.log(user);

    // compare password
    const match = await bcrypt.compare(password, user.user_password);
    if (!match) {
      console.log("invalid password");
      throw { msg: "Invalid username of password", status: 400 };
    }
    // generate token
    let playload = { userID: user.user_id, userName: user.user_name };
    const token = jwt.sign(playload, process.env.JWT_KEY, { expiresIn: "1h" });

    res.status(200).json({ token: token });
    console.log("sended token");
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json(error.msg || "Internal Server Error");
  }
});

// get all url to show in admin dashboard
app.post("/admin/history", verifyToken, async (req, res) => {
  try {
    let queryAllUrl = "SELECT * FROM `url` ORDER BY url_id DESC";
    const [allUrl] = await con.query(queryAllUrl).catch((err) => {
      console.log(err);
      throw { msg: "Internal Server Error", status: 500 };
    });
    res.json(allUrl);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send(error.msg || "Internal Server Error");
  }
});

// verify token middleware
function verifyToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw { msg: "Access has blocked", status: 400 };
    }
    let decoded = jwt.verify(token, process.env.JWT_KEY);

    req.afterDecoded = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send("Access has blocked");
  }
}

// app.get("/hash/:password", (req, res) => {
//   bcrypt.hash(req.params.password, saltRounds, function (err, hash) {
//     res.send(hash);
//     // Store hash in your password DB.
//   });
// });

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log("Server s starting at port " + PORT);
});
