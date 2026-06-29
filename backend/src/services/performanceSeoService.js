const analyzePerformanceSEO = (response) => {

    const headers = response.headers;

    return {

        statusCode: response.status,

        redirected:
            response.request?.res?.responseUrl !== response.config.url,

        compression:
            headers["content-encoding"] || "None",

        cacheControl:
            headers["cache-control"] || "Missing",

        xPoweredBy:
            headers["x-powered-by"] || "Hidden",

        strictTransportSecurity:
            headers["strict-transport-security"] || "Missing",

        contentSecurityPolicy:
            headers["content-security-policy"] || "Missing"

    };

};

module.exports = {

    analyzePerformanceSEO

};