import { FaFileAlt } from "react-icons/fa";
function ContentCard({ analysis }) {

    const items = [
        ["Words", analysis.wordCount],
        ["Characters", analysis.characterCount],
        ["Paragraphs", analysis.paragraphCount],
        ["Reading Time", `${analysis.readingTime} min`]
    ];

    return (

        <div className="card">

            <h2>
                <FaFileAlt /> Content SEO
            </h2>

            {items.map(([label, value]) => (

                <div
                    key={label}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid #374151"
                    }}
                >
                    <strong>{label}</strong>

                    <span>{value}</span>

                </div>

            ))}

        </div>

    );

}

export default ContentCard;