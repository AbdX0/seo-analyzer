import { FaBolt } from "react-icons/fa";
function PerformanceCard({ analysis }) {

    const items = [
        ["Response Time", `${analysis.responseTime} ms`],
        ["Status", analysis.statusCode],
        ["Server", analysis.server],
        ["Compression", analysis.compression],
        ["Cache", analysis.cacheControl]
    ];

    return (

        <div className="card">

            <h2>
                <FaBolt /> Performance
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

export default PerformanceCard;