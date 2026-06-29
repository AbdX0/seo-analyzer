const cheerio = require("cheerio");

const analyzeHTML = (html, url) => {
    const $ = cheerio.load(html);

    const pageText = $("body").text().toLowerCase();

    const words = pageText
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(word => word.length > 3);

    const keywordMap = {};

    words.forEach(word => {
        keywordMap[word] = (keywordMap[word] || 0) + 1;
    });

    const topKeywords = Object.entries(keywordMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const pageUrl = new URL(url);

    const https = pageUrl.protocol === "https:";

    const title = $("title").text().trim();

    const metaDescription =
        $('meta[name="description"]').attr("content") || "";

    const canonical =
    $('link[rel="canonical"]').attr("href") || "";    

    const viewport =
        $('meta[name="viewport"]').attr("content") || "";

    const mobileFriendly =
        viewport.includes("width=device-width");

    const mobileFriendlyStatus =
        mobileFriendly
            ? "Friendly"
            : "Not Friendly";    

    const robotsMeta =
         $('meta[name="robots"]').attr("content") || "";    

    const openGraph = {
        title: $('meta[property="og:title"]').attr("content") || "",
        description: $('meta[property="og:description"]').attr("content") || "",
        image: $('meta[property="og:image"]').attr("content") || "",
        url: $('meta[property="og:url"]').attr("content") || ""
    };   
    
    const twitterCard = {
        card: $('meta[name="twitter:card"]').attr("content") || "",
        title: $('meta[name="twitter:title"]').attr("content") || "",
        description: $('meta[name="twitter:description"]').attr("content") || "",
        image: $('meta[name="twitter:image"]').attr("content") || ""
    };

    const htmlLanguage = $("html").attr("lang") || "";

    const charset =
        $('meta[charset]').attr("charset") || "";

    const favicon =
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href") ||
        "";    

    const structuredData =
        $('script[type="application/ld+json"]').length;

    const structuredDataStatus =
        structuredData > 0
            ? "Present"
            : "Missing";    

    const h1Count = $("h1").length;
    const h2Count = $("h2").length;
    const h3Count = $("h3").length;
    const h4Count = $("h4").length;
    const h5Count = $("h5").length;
    const h6Count = $("h6").length;

    const images = $("img");

    const imagesWithoutAlt = [];

    images.each((index, element) => {

        const alt = $(element).attr("alt");

        if (!alt || alt.trim() === "") {

            imagesWithoutAlt.push({
                src: $(element).attr("src") || "No source found"
            });

        }

    });

    const links = $("a");

    let internalLinks = 0;
    let externalLinks = 0;

    links.each((index, element) => {

        const href = $(element).attr("href");

        if (!href) return;

        if (
            href.startsWith("/") ||
            href.startsWith("#")
        ) {
            internalLinks++;
        }
        else if (href.startsWith("http")) {

            try {

                const linkUrl = new URL(href);

                if (linkUrl.hostname === pageUrl.hostname) {
                    internalLinks++;
                }
                else {
                    externalLinks++;
                }

            } catch (error) {
                // Ignore invalid URLs
            }
        }

    });


    return {
        title,
        titleLength: title.length,
        titleStatus:
            title.length >= 30 && title.length <= 60
                ? "Good"
                : "Needs Improvement",
        topKeywords,

        totalWords: words.length,
        metaDescription,
        metaDescriptionLength: metaDescription.length,
        metaDescriptionStatus:
            metaDescription.length >= 120 &&
            metaDescription.length <= 160
                ? "Good"
                : "Needs Improvement",

                canonical,

                canonicalStatus:
                    canonical
                        ? "Present"
                        : "Missing",

                        viewport,

                        viewportStatus:
                            viewport
                                ? "Present"
                                : "Missing",

                                robotsMeta,
                                mobileFriendly,
                                mobileFriendlyStatus,

                                robotsMetaStatus:
                                    robotsMeta
                                        ? "Present"
                                        : "Missing",

                                        openGraph,

                                        openGraphStatus:
                                            openGraph.title ||
                                            openGraph.description ||
                                            openGraph.image ||
                                            openGraph.url
                                                ? "Present"
                                                : "Missing",

                                                twitterCard,

                                                twitterCardStatus:
                                                    twitterCard.card ||
                                                    twitterCard.title ||
                                                    twitterCard.description ||
                                                    twitterCard.image
                                                        ? "Present"
                                                        : "Missing",

                                                        htmlLanguage,

                                                        htmlLanguageStatus:
                                                            htmlLanguage
                                                                ? "Present"
                                                                : "Missing",

                                                                charset,

                                                                charsetStatus:
                                                                    charset
                                                                        ? "Present"
                                                                        : "Missing",

                                                                        favicon,

                                                                        faviconStatus:
                                                                            favicon
                                                                                ? "Present"
                                                                                : "Missing",

                                                                                https,

                                                                                structuredData,

                                                                                structuredDataStatus,


                                                                    

                                                                                httpsStatus:
                                                                                    https
                                                                                        ? "Secure"
                                                                                        : "Not Secure",

        h1Count,
        h1Status:
            h1Count === 1 ? "Good" : "Needs Improvement",

        h2Count,
        h3Count,
        h4Count,
        h5Count,
        h6Count,

        imageCount: images.length,
        imagesWithoutAltCount: imagesWithoutAlt.length,
        imagesWithoutAlt,

        linkCount: links.length,

        internalLinks,

        externalLinks
    };
};

module.exports = {
    analyzeHTML
};