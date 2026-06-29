import StatusBadge from "./StatusBadge";

function AnalysisCard({ analysis }) {

    const rows = [
        ["Title", analysis.title],
        ["Title Length", analysis.titleLength],
        ["Title Status", analysis.titleStatus],

        ["Meta Description", analysis.metaDescription || "Not Found"],
        ["Meta Length", analysis.metaDescriptionLength],
        ["Meta Status", analysis.metaDescriptionStatus],

        ["H1 Count", analysis.h1Count],
        ["H2 Count", analysis.h2Count],

        ["Canonical", analysis.canonical || "Missing"],
        ["Viewport", analysis.viewport],
        ["Language", analysis.htmlLanguage],
        ["Charset", analysis.charset || "Missing"],

        ["Open Graph", analysis.openGraphStatus],
        ["Twitter Card", analysis.twitterCardStatus]
    ];

    return (

        <div className="card">

            <h2>SEO Analysis</h2>

            {rows.map(([label, value]) => (

                <div
                    key={label}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 0",
                        borderBottom: "1px solid #374151",
                        gap: "20px"
                    }}
                >

                    <strong>{label}</strong>

                    {
                        value === "Good" ||
                        value === "Missing" ||
                        value === "Present" ||
                        value === "Needs Improvement" ||
                        value === "Secure"

                            ? <StatusBadge status={value} />

                            : (
                                <span
                                    style={{
                                        textAlign: "right",
                                        maxWidth: "60%"
                                    }}
                                >
                                    {String(value)}
                                </span>
                            )
                    }

                </div>

            ))}

        </div>

    );

}

export default AnalysisCard;