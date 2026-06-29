import { FaLightbulb } from "react-icons/fa";
function RecommendationCard({

    recommendations

}) {

    return (

        <div
            className="card"
            style={{
                borderLeft: "5px solid #3b82f6"
            }}
        >

            <h2>
                <FaLightbulb /> SEO Improvement Suggestions
            </h2>

            <ul>

                {

                    recommendations.map(

                        (item, index) => (

                            <li
                                key={index}
                                style={{
                                    marginBottom: "14px",
                                    lineHeight: "28px"
                                }}
                            >
                                ✅ {item}
                            </li>

                        )

                    )

                }

            </ul>

        </div>

    );

}

export default RecommendationCard;