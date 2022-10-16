const { ready, success, error } = require("consola");
const { readdirSync } = require("fs");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db.config");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
require("express-async-errors");

// router import
// const InstructorRoutes = require("./routes/instructor.routes");
// const AuthRoutes = require("./routes/auth.routes");
// const CourseRoutes = require("./routes/course.routes");
// const UserRoutes = require("./routes/user.routes");

// port
const port = process.env.PORT || process.env.port;
//database Uri
const dbUri = process.env.DBURI;

// create express instance
const app = express();

// apply middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome To Our Online Educational Market Api!!!");
});

//routes
readdirSync("./routes").map((r) => {
  app.use("/server", require(`./routes/${r}`));
});
// app.use("/api", AuthRoutes);
// app.use("/api", UserRoutes);
// app.use("/api", InstructorRoutes);
// app.use("/api", CourseRoutes);

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
