const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.ORIGIN;

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: CORS_ORIGIN }));

// START SERVER
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
