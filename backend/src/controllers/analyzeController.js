const jobs = require("../utils/jobStore");
const crypto = require("crypto");
const { validateUrl } = require("../utils/validateUrl");
const { generateSEOReport } = require("../services/seoRuleEngine");
const { crawlWebsite } = require("../services/crawlerService");


const analyzeWebsite = async (req, res) => {

    try {

        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "Website URL is required"
            });
        }

        if (!validateUrl(url)) {
            return res.status(400).json({
                success: false,
                message: "Invalid URL"
            });
        }

        const jobId = crypto.randomUUID();

        jobs[jobId] = {
            status: "processing",
            analysis: null,
            report: null
        };

        res.status(202).json({
            success: true,
            jobId,
            status: "processing"
        });

        try {

            const analysis = await crawlWebsite(url);

            const report =
                generateSEOReport(analysis);

            jobs[jobId] = {
                status: "completed",
                analysis,
                report
            };

        } catch (err) {

            let message = err.message;

            if (
                err.response?.status === 403 ||
                err.response?.status === 401 ||
                err.response?.status === 429
            ) {
                message =
                    "This website blocks automated crawlers or requires authentication. Please try another publicly accessible website.";
            }

            else if (
                err.code === "ECONNABORTED"
            ) {
                message =
                    "The website took too long to respond. Please try again later.";
            }

            else if (
                err.code === "ENOTFOUND"
            ) {
                message =
                    "Website could not be found. Please check the URL.";
            }

            jobs[jobId] = {
                status: "failed",
                message
            };

        }

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const getAnalysisResult = (req, res) => {
    
    const { id } = req.params;

    const job = jobs[id];

    if (!job) {

        return res.status(404).json({

            success: false,

            message: "Job not found"

        });

    }

    res.json(job);

};

module.exports = {
    analyzeWebsite,
    getAnalysisResult
};