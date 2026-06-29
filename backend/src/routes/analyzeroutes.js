const express = require("express");

const router = express.Router();

const {
    analyzeWebsite,
    getAnalysisResult
} = require("../controllers/analyzeController");

router.post("/analyze", analyzeWebsite);

router.get("/results/:id", getAnalysisResult);

module.exports = router;