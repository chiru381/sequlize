// const sequelize = require("./utils/database");
// const Customer = require("./models/Customer");
// const Order = require("./models/Order");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

let Userroutes = require("./routes/user.router");

// const { Pool, Client } = require("pg");

// const credentials = {
//   user: "postgres",
//   host: "localhost",
//   database: "postgresss9",
//   password: "chiru123",
//   port: 5432,
// };

// Connect with a connection pool.

// async function poolDemo() {
//   const pool = new Pool(credentials);
//   const now = await pool.query("SELECT NOW()");
//   await pool.end();

//   return now;
// }

// Connect with a client.

// async function clientDemo() {
//   const client = new Client(credentials);
//   await client.connect();
//   const now = await client.query("SELECT NOW()");
//   await client.end();

//   return now;
// }

// Use a self-calling function so we can use async / await.

// (async () => {
//   const poolResult = await poolDemo();
//   console.log("Time with pool: " + poolResult.rows[0]["now"]);

//   const clientResult = await clientDemo();
//   console.log("Time with client: " + clientResult.rows[0]["now"]);
// })();

app.use(helmet());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const db = require("./service/db.service");

db.sequelize.sync();

var allowlist = [
    "http://localhost:3031"
  ];
  var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };
  
  app.use(cors(corsOptionsDelegate));
  app.use(bodyParser.json());
  
  app.use("/api", Userroutes);


const PORT = 3031;

app.listen(PORT, (req, res) => {
  console.log("listening on 3031");
});
