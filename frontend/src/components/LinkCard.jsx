import { FaLink } from "react-icons/fa";
function LinkCard({ analysis }) {

    const items = [
        ["Internal Links", analysis.internalLinks],
        ["External Links", analysis.externalLinks],
        ["NoFollow Links", analysis.nofollowLinks],
        ["Empty Links", analysis.emptyLinks],
        ["Mail Links", analysis.mailLinks],
        ["Telephone Links", analysis.telephoneLinks],
        ["JavaScript Links", analysis.javascriptLinks]
    ];

    return (

        <div className="card">

            <h2>
                <FaLink /> Link SEO
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

export default LinkCard;