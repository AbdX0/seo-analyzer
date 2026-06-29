require("dotenv").config();
const analyzeRoutes = require("./routes/analyzeRoutes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SEO Analyzer API is running 🚀"
  });
});

app.use("/api", analyzeRoutes);

module.exports = app;