import { ready, success } from "consola";
import { readdirSync } from "fs";
import express from "express";
import cors from "cors";
const morgan = require("morgan");
require("dotenv").config();

// create express App
const app = express();

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
readdirSync("./routes").map((r) => {
  app.use("/api", require(`./routes/${r}`));
});

// port
const port = process.env.PORT || 4000;

app.listen(
  port,
  success({
    message: `Server is running on port ${port}`,
    badge: true,
  })
);
