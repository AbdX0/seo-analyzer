import { useEffect, useState } from "react";

function LoadingSpinner() {

    const steps = [
        { icon: "🌐", text: "Crawling Website" },
        { icon: "⚙️", text: "Technical SEO" },
        { icon: "📝", text: "Content Analysis" },
        { icon: "🖼️", text: "Image SEO" },
        { icon: "🔗", text: "Link Analysis" },
        { icon: "📊", text: "Calculating SEO Score" },
        { icon: "📄", text: "Generating Report" }
    ];

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentStep(prev => {

                if (prev < steps.length - 1)
                    return prev + 1;

                return prev;

            });

        }, 350);

        return () => clearInterval(interval);

    }, []);

    return (

        <div
            className="card fade"
            style={{
                maxWidth: "700px",
                margin: "35px auto",
                padding: "20px"
            }}
        >

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "18px"
                }}
            >

                <div
                    style={{
                        width: "34px",
                        height: "34px",
                        border: "4px solid rgba(255,255,255,.08)",
                        borderTop: "4px solid #3b82f6",
                        borderRadius: "50%",
                        animation: "spin .8s linear infinite"
                    }}
                />

                <div>

                    <h2
                        style={{
                            margin: 0
                        }}
                    >
                        Analyzing Website
                    </h2>

                    <span
                        style={{
                            color: "#94a3b8"
                        }}
                    >
                        Performing complete SEO audit...
                    </span>

                </div>

            </div>

            {

                steps.map((step, index) => (

                    <div

                        key={step.text}

                        style={{

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",

                            padding: "10px 14px",

                            marginBottom: "8px",

                            borderRadius: "10px",

                            background:
                                index <= currentStep
                                    ? "rgba(37,99,235,.13)"
                                    : "rgba(255,255,255,.03)",

                            border:
                                index === currentStep
                                    ? "1px solid #3b82f6"
                                    : "1px solid rgba(255,255,255,.05)",

                            boxShadow:
                                index === currentStep
                                    ? "0 0 18px rgba(59,130,246,.25)"
                                    : "none",

                            transform:
                                index <= currentStep
                                    ? "translateY(0px)"
                                    : "translateY(18px)",

                            opacity:
                                index <= currentStep
                                    ? 1
                                    : .35,

                            transition:
                                "all .45s ease"

                        }}

                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "14px"
                            }}
                        >

                            <div
                                style={{
                                    width: "34px",
                                    height: "34px",
                                    borderRadius: "10px",
                                    background: "rgba(59,130,246,.15)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "18px"
                                }}
                            >

                                {step.icon}

                            </div>

                            <strong
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "600"
                                    
                                }}
                            >
                                {step.text}
                            </strong>

                        </div>

                        {

                            index < currentStep ?

                                <span
                                    style={{
                                        color: "#22c55e",
                                        fontSize: "24px"
                                    }}
                                >
                                    ✓
                                </span>

                                :

                                index === currentStep ?

                                    <div
                                        style={{
                                            width: "22px",
                                            height: "22px",
                                            border: "3px solid #334155",
                                            borderTop: "3px solid #3b82f6",
                                            borderRadius: "50%",
                                            animation: "spin .8s linear infinite"
                                        }}
                                    />

                                    :

                                    <div
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                            background: "#475569",
                                            borderRadius: "50%"
                                        }}
                                    />

                        }

                    </div>

                ))

            }

        </div>

    );

}

export default LoadingSpinner;