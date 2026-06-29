const cheerio = require("cheerio");

const analyzeLinkSEO = (html, url) => {

    const $ = cheerio.load(html);

    const pageUrl = new URL(url);

    const links = $("a");

    let internalLinks = 0;
    let externalLinks = 0;
    let nofollowLinks = 0;
    let emptyLinks = 0;
    let mailLinks = 0;
    let telephoneLinks = 0;
    let javascriptLinks = 0;

    links.each((index, element) => {

        const href = $(element).attr("href") || "";
        const rel = $(element).attr("rel") || "";

        if (href.trim() === "") {
            emptyLinks++;
            return;
        }

        if (rel.includes("nofollow")) {
            nofollowLinks++;
        }

        if (href.startsWith("mailto:")) {
            mailLinks++;
            return;
        }

        if (href.startsWith("tel:")) {
            telephoneLinks++;
            return;
        }

        if (href.startsWith("javascript:")) {
            javascriptLinks++;
            return;
        }

        if (
            href.startsWith("/") ||
            href.startsWith("#")
        ) {

            internalLinks++;
            return;

        }

        if (href.startsWith("http")) {

            try {

                const link = new URL(href);

                if (link.hostname === pageUrl.hostname) {

                    internalLinks++;

                } else {

                    externalLinks++;

                }

            } catch {}

        }

    });

    return {

        internalLinks,

        externalLinks,

        nofollowLinks,

        emptyLinks,

        mailLinks,

        telephoneLinks,

        javascriptLinks

    };

};

module.exports = {

    analyzeLinkSEO

};