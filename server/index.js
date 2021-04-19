const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
// const routes = require('./routes/index')
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectionUrl = process.env.DB_CONNECT;
mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB connect");
});

PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
