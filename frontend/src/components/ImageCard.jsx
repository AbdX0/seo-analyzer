import { FaImage } from "react-icons/fa";
function ImageCard({ analysis }) {

    const items = [
        ["Images", analysis.imageCount],
        ["Missing Alt", analysis.missingAlt],
        ["Missing Title", analysis.missingTitle],
        ["Lazy Loaded", analysis.lazyLoaded]
    ];

    return (

        <div className="card">

            <h2>
                <FaImage /> Image SEO
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

export default ImageCard;