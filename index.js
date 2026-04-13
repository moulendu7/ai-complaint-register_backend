const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const cors = require("cors");
const passport = require("passport");

const connect_db = require("./config/db-connect.js");
const passportConfig = require("./auth/passport");

const app = express();
const routes = require("./routes/index.js");

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,             
  })
);
app.use(cookieParser());
app.use(express.json());  
app.use("/api", routes);  
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passportConfig(passport);
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connect_db();
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error(" Failed to start server:", err);
    process.exit(1);
  }
};

startServer();