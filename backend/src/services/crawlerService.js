const axios = require("axios");

const { analyzeHTML } = require("./seoAnalyzerService");
const { analyzeTechnicalSEO } = require("./technicalSeoService");
const { analyzeContentSEO } = require("./contentSeoService");
const { analyzeImageSEO } = require("./imageSeoService");
const { analyzeLinkSEO } = require("./linkSeoService");
const { analyzePerformanceSEO } = require("./performanceSeoService");


const crawlWebsite = async (url) => {

    const startTime = Date.now();

    const response = await axios.get(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
            "Accept":
                "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language":
                "en-US,en;q=0.9"
        },
        timeout: 10000
    });

    const analysis = analyzeHTML(response.data, url);

    const technicalSEO = await analyzeTechnicalSEO(
        url,
        response
    );

    const contentSEO = analyzeContentSEO(
        response.data
    );

    const imageSEO = analyzeImageSEO(
        response.data
    );

    const linkSEO = analyzeLinkSEO(
        response.data,
        url
    );

    const performanceSEO = analyzePerformanceSEO(
        response
    );

    analysis.responseTime =
        Date.now() - startTime;

    analysis.url = url;

    analysis.analysisTime =
        new Date().toLocaleString();

    Object.assign(
        analysis,
        technicalSEO,
        contentSEO,
        imageSEO,
        linkSEO,
        performanceSEO

    );

    return analysis;
};

module.exports = {
    crawlWebsite
};