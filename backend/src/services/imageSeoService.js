const cheerio = require("cheerio");

const analyzeImageSEO = (html) => {

    const $ = cheerio.load(html);

    const images = $("img");

    let missingAlt = 0;
    let missingTitle = 0;
    let lazyLoaded = 0;
    let missingDimensions = 0;

    const formats = {};

    images.each((index, element) => {

        const img = $(element);

        const alt = img.attr("alt");
        const title = img.attr("title");
        const loading = img.attr("loading");
        const width = img.attr("width");
        const height = img.attr("height");
        const src = img.attr("src") || "";

        if (!alt || alt.trim() === "")
            missingAlt++;

        if (!title || title.trim() === "")
            missingTitle++;

        if (loading === "lazy")
            lazyLoaded++;

        if (!width || !height)
            missingDimensions++;

        const extension = src.split(".").pop().toLowerCase();

        if (
            ["jpg", "jpeg", "png", "gif", "webp", "svg", "avif"].includes(extension)
        ) {

            formats[extension] =
                (formats[extension] || 0) + 1;

        }

    });

    return {

        missingAlt,

        missingTitle,

        lazyLoaded,

        missingDimensions,

        imageFormats: formats

    };

};

module.exports = {

    analyzeImageSEO

};