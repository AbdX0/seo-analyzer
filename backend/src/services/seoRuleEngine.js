const generateSEOReport = (analysis) => {

    let technicalScore = 100;
    let onPageScore = 100;
    let contentScore = 100;
    let performanceScore = 100;

    const recommendations = [];

    // ---------- ON PAGE SEO ----------

    if (analysis.titleLength < 30 || analysis.titleLength > 60) {
        onPageScore -= 10;
        recommendations.push(
            "Title should be between 30 and 60 characters."
        );
    }

    if (
        analysis.metaDescriptionLength < 120 ||
        analysis.metaDescriptionLength > 160
    ) {
        onPageScore -= 10;
        recommendations.push(
            "Meta description should be between 120 and 160 characters."
        );
    }

    if (analysis.h1Count !== 1) {
        onPageScore -= 10;
        recommendations.push(
            "Page should contain exactly one H1 tag."
        );
    }

    if (analysis.imagesWithoutAltCount > 0) {
        onPageScore -= 10;
        recommendations.push(
            `${analysis.imagesWithoutAltCount} image(s) are missing alt attributes.`
        );
    }

    if (analysis.openGraphStatus === "Missing") {
        onPageScore -= 5;
        recommendations.push(
            "Open Graph tags are missing."
        );
    }

    if (analysis.twitterCardStatus === "Missing") {
        onPageScore -= 5;
        recommendations.push(
            "Twitter Card tags are missing."
        );
    }

    // ---------- TECHNICAL SEO ----------

    if (!analysis.canonical) {
        technicalScore -= 10;
        recommendations.push(
            "Canonical tag is missing."
        );
    }

    if (!analysis.viewport) {
        technicalScore -= 5;
        recommendations.push(
            "Viewport meta tag is missing."
        );
    }

    if (!analysis.mobileFriendly) {

        technicalScore -= 5;

        recommendations.push(
            "Website is not mobile friendly."
        );

    }

    if (!analysis.robotsMeta) {
        technicalScore -= 5;
        recommendations.push(
            "Meta robots tag is missing."
        );
    }

    if (!analysis.htmlLanguage) {
        technicalScore -= 5;
        recommendations.push(
            "HTML lang attribute is missing."
        );
    }

    if (!analysis.charset) {
        technicalScore -= 5;
        recommendations.push(
            "Character encoding is missing."
        );
    }

    if (!analysis.favicon) {
        technicalScore -= 5;
        recommendations.push(
            "Favicon is missing."
        );
    }

    if (
        analysis.structuredDataStatus === "Missing"
    ) {

        technicalScore -= 5;

        recommendations.push(
            "Structured data (Schema.org) is missing."
        );

    }

    if (!analysis.https) {
        technicalScore -= 10;
        recommendations.push(
            "Website is not using HTTPS."
        );
    }

    // ---------- CONTENT ----------

    if (analysis.wordCount < 300) {
        contentScore -= 10;
        recommendations.push(
            "Content is too short. Aim for at least 300 words."
        );
    }

    if (analysis.paragraphCount < 3) {
        contentScore -= 5;
        recommendations.push(
            "Consider adding more paragraphs for better readability."
        );
    }

    if (analysis.readingTime < 2) {
        contentScore -= 5;
        recommendations.push(
            "Content may be too brief. Increase the depth of the article."
        );
    }

    // ---------- PERFORMANCE ----------

    if (analysis.emptyLinks > 0) {
        performanceScore -= 5;
        recommendations.push(
            `${analysis.emptyLinks} empty link(s) found.`
        );
    }

    if (analysis.javascriptLinks > 0) {
        performanceScore -= 5;
        recommendations.push(
            "Avoid JavaScript links for SEO-critical navigation."
        );
    }

    if (analysis.nofollowLinks > 10) {
        performanceScore -= 5;
        recommendations.push(
            "Large number of nofollow links detected."
        );
    }

    technicalScore = Math.max(0, technicalScore);
    onPageScore = Math.max(0, onPageScore);
    contentScore = Math.max(0, contentScore);
    performanceScore = Math.max(0, performanceScore);

    const score = Math.round(
        (
            technicalScore +
            onPageScore +
            contentScore +
            performanceScore
        ) / 4
    );

    let grade = "F";

    if (score >= 95) grade = "A+";
    else if (score >= 90) grade = "A";
    else if (score >= 80) grade = "B";
    else if (score >= 70) grade = "C";
    else if (score >= 60) grade = "D";

    
    return {
        score,
        grade,
        technicalScore,
        contentScore,
        performanceScore,
        recommendations
    };
};

module.exports = {
    generateSEOReport
};