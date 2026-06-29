const cheerio = require("cheerio");

const analyzeContentSEO = (html) => {

    const $ = cheerio.load(html);

    const bodyText = $("body").text().replace(/\s+/g, " ").trim();

    const words = bodyText.length
        ? bodyText.split(" ")
        : [];

    const paragraphs = $("p");

    let longestParagraph = 0;

    paragraphs.each((index, element) => {

        const length = $(element).text().trim().length;

        if (length > longestParagraph) {
            longestParagraph = length;
        }

    });

    const averageParagraphLength =
        paragraphs.length > 0
            ? Math.round(bodyText.length / paragraphs.length)
            : 0;

    const readingTime =
        Math.max(1, Math.ceil(words.length / 200));

    return {

        wordCount: words.length,

        characterCount: bodyText.length,

        paragraphCount: paragraphs.length,

        readingTime,

        longestParagraph,

        averageParagraphLength

    };

};

module.exports = {

    analyzeContentSEO

};