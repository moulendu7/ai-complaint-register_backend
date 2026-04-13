const express = require("express");
require("dotenv").config();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const connect_db = require("./config/db-connect");
const passportConfig = require("./auth/passport");

const routes = require("./routes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passportConfig(passport);


app.use("/api", routes);


app.get("/", (req, res) => {
  res.status(200).send("Server is running 🚀");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

connect_db()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB connection failed:", err));