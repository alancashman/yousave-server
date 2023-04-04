// IMPORTS
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
require("dotenv").config();

// .ENV VARIABLES
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.ORIGIN;

// CREATE SERVER
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: CORS_ORIGIN }));

// ROUTES
const transactionsRoutes = require("./routes/transactions");

app.use("/transactions", transactionsRoutes);

// GET home page
app.get("/", (req, res) => {
  res.send("Hello");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
