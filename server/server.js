const express = require("express");
const bodyParser = require("body-parser");
const con = require("./config/db");
const shortId = require("shortid");
const cors = require("cors");

const app = express();

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

app.post("/shorturl", async (req, res) => {
  let { fullUrl } = req.body;
  let shorturl = shortId.generate();
  try {
    await con.promise().beginTransaction((err) => {
      if (err) {
        console.log("connection fail");
        throw { msg: "connection fail", status: 500 };
      }
    });

    let insertShortUrl =
      "INSERT INTO `url` (`url_full`, `url_short`) VALUES (?,?);";

    if (fullUrl.substring(0, 4) !== "http") {
      throw { msg: "url not collect", status: 400 };
    }

    await con.promise().query(insertShortUrl, [fullUrl, shorturl], (err) => {
      if (err) {
        console.log(err);
        throw { msg: "Internal Server Error", status: 500 };
      }
    });

    await con.promise().commit();
    res.status(200).json({ shortId: shorturl, status: 200 });
  } catch (error) {
    console.log(error);
    con.promise().rollback();
    res.status(error.status).send(error.msg);
  }
});

app.get("/short/:id", async (req, res) => {
  console.log(req.headers);
  const { id } = req.params;
  console.log("========>", id);
  try {
    await con.promise().beginTransaction((err) => {
      if (err) {
        console.log("connection fail");
        throw { msg: "connection fail", status: 500 };
      }
    });

    let queryFullUrl = "SELECT * FROM `url` WHERE url_short = ?";

    let [fullUrl] = await con.promise().query(queryFullUrl, [id], (err) => {
      if (err) {
        console.log(err);
        throw { msg: "Internal Server Error", status: 500 };
      }
    });

    let updateClick = "UPDATE `url` SET `clicked` = ? WHERE `url_id` = ?";
    await con
      .promise()
      .query(
        updateClick,
        [fullUrl[0].clicked + 1, fullUrl[0].url_id],
        (err) => {
          if (err) {
            console.log(err);
            throw { msg: "Internal Server Error", status: 500 };
          }
        }
      );

    // if(fullUrl){]}
    await con.promise().commit();
    res.redirect(fullUrl[0].url_full);
  } catch (error) {
    console.log(error);
    con.promise().rollback();
    res.status(error.status).send(error.msg);
  }
});

app.get("/test/a", (req, res) => {
  console.log(req.get("origin"));
  res.send("aaa");
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log("Server s starting at port " + PORT);
});
