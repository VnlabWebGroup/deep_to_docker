const keys = require("./keys");

// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express(); //init sending and receiving http request
app.use(cors()); // allow make request from one domain to different domain or different port
app.use(bodyParser.json()); // parse body of request into json

// PostgreSQL Client Setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgUser,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});

// Redis Client Setup
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPost,
  retry_strategy: () => 1000,
});

// duplicate because if we have a client that listening or publishing info on retests, when it does, it can not be used for other purposes.
const redisPublisher = redisClient.duplicate();

// Express route handles
app.get("/", (_, res) => {
  res.send("Hi");
});

app.get("/values/all", async (_, res) => {
  const values = await pgClient.query("SELECT * FROM values");
  res.send(values.rows);
});

app.get("/values/current", async (_, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high");
  }

  redisClient.hset("values", index, "Nothing yet!");
  redisPublisher.publish("abcdxyz", index);
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);
  res.send({ working: true });
});

app.listen(5002, (err) => {
  console.log("Ready! Listening");
});
