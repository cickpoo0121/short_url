const express = require("express");
const bodyParser = require("body-parser");
const con = require("./config/db");
const shortId = require("shortid");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/shorturl", async (req, res) => {
  let { fullUrl } = req.body;
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

    await con
      .promise()
      .query(insertShortUrl, [fullUrl, shortId.generate()], (err) => {
        if (err) {
          console.log(err);
          throw { msg: "Internal Server Error", status: 500 };
        }
      });

    await con.promise().commit();
    res.send("create short url successfully");
  } catch (error) {
    console.log(error);
    con.promise().rollback();
    res.status(error.status).send(error.msg);
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
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

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log("Server s starting at port " + PORT);
});
