import StatusBadge from "./StatusBadge";
import { FaCog } from "react-icons/fa";



function TechnicalCard({ analysis }) {
    

    const items = [
    ["HTTPS", analysis.httpsStatus],
    ["Canonical", analysis.canonicalStatus],
    ["Viewport", analysis.viewportStatus],
    ["Mobile Friendly", analysis.mobileFriendlyStatus],
    ["Structured Data", analysis.structuredDataStatus],
    ["Robots", analysis.robotsMetaStatus],
    ["Charset", analysis.charsetStatus],
];

    

    return (

        

        <div className="card">

            <h2>
                <FaCog /> Technical SEO
            </h2>

            {items.map(([name, status]) => (

                <div
                    key={name}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 0",
                        borderBottom: "1px solid #374151"
                    }}
                >
                    <strong>{name}</strong>

                    <StatusBadge status={status} />

                </div>

            ))}

        </div>


    );

}



export default TechnicalCard;

