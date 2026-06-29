const axios = require("axios");

const analyzeTechnicalSEO = async (url, response) => {

    let robotsTxt = false;
    let sitemap = false;
    let manifest = false;

    const server = response.headers.server || "Unknown";

    const contentType =
        response.headers["content-type"] || "Unknown";

    // robots.txt
    try {

        const robotsUrl = new URL("/robots.txt", url).href;

        const robotsResponse = await axios.get(robotsUrl, {
            timeout: 5000
        });

        robotsTxt = robotsResponse.status === 200;

    } catch {}

    // sitemap.xml
    try {

        const sitemapUrl = new URL("/sitemap.xml", url).href;

        const sitemapResponse = await axios.get(sitemapUrl, {
            timeout: 5000
        });

        sitemap = sitemapResponse.status === 200;

    } catch {}

    // manifest.json
    try {

        const manifestUrl = new URL("/manifest.json", url).href;

        const manifestResponse = await axios.get(manifestUrl, {
            timeout: 5000
        });

        manifest = manifestResponse.status === 200;

    } catch {}

    return {

        robotsTxt,

        sitemap,

        manifest,

        server,

        contentType

    };

};

module.exports = {

    analyzeTechnicalSEO

};