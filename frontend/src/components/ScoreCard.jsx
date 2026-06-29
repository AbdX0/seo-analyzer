import { useEffect, useState } from "react";

function ScoreCard({ score }) {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(score);
        }, 200);

        return () => clearTimeout(timer);
    }, [score]);

    let color = "#22c55e";
    let label = "Excellent";
    let grade = "A+";


    if (score < 90) {
        color = "#84cc16";
        label = "Very Good";
    }

    if (score < 80) {
        color = "#eab308";
        label = "Good";
    }

    if (score < 60) {
        color = "#f97316";
        label = "Average";
    }

    if (score < 40) {
        color = "#ef4444";
        label = "Poor";
    }

    return (

        <div
            className="card"
            style={{
                textAlign: "center"
            }}
        >

            <h2
                style={{
                    marginBottom: "25px"
                }}
            >
                SEO Score
            </h2>

            <div
                style={{
                    width: "190px",
                    height: "190px",
                    margin: "auto",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: `conic-gradient(
                        ${color} ${progress * 3.6}deg,
                        #334155 ${progress * 3.6}deg
                    )`,
                    transition: "all 1.2s ease",
                    boxShadow: `
                    0 0 15px ${color}66,
                    0 0 35px ${color}55,
                    0 0 70px ${color}22
                    `
                }}
            >

                <div
                    style={{
                        width: "145px",
                        height: "145px",
                        background: "#0f172a",
                        borderRadius: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >

                    <h1
                        style={{
                            color,
                            fontSize: "58px",
                            margin: 0
                        }}
                    >
                        {score}
                    </h1>

                    <span
                        style={{
                            color: "#94a3b8",
                            marginTop: "5px"
                        }}
                    >
                        Grade {grade}
                    </span>

                </div>

            </div>

            <h3
                style={{
                    color,
                    marginTop: "25px"
                }}
            >
                {label}
            </h3>

        </div>

    );

}

export default ScoreCard;