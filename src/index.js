const express = require("express");
const app = express();

const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
const multer = require("multer");

const { dbConnection } = require("./database/db");
const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoutes");

const url = process.env.URL;
const port = process.env.PORT || 5000;

dbConnection(url);
app.use(multer().any());
app.use(express.json());

app.use("/api/accounts", userRoutes);
app.use("/api/post", postRoutes);

app.listen(port, () => {
  console.log(`server start on port ${port}`);
});
