const { ready, success, error } = require("consola");
const { readdirSync } = require("fs");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDb = require("./config/db.config");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
require("express-async-errors");

// port
const port = process.env.PORT || process.env.port;
//database Uri
const dbUri = process.env.DBURI;

// create express instance
const app = express();

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome To Our Online Educational Market Api!!!");
});

//routes
readdirSync("./routes").map((r) => {
  app.use("/api", require(`./routes/${r}`));
});

// custom middlewares
app.use(errorHandler);

const start = async () => {
  await connectDb(dbUri);
  ready({
    message: "🚀 Database Connected...",
    badge: true,
  });
  app.listen(
    port,
    success({
      message: `🚀 Server running on port ${port}`,
      badge: true,
    })
  );
};

start();
