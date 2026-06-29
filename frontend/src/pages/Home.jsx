import { useState } from "react";
import Header from "../components/Header";
import UrlForm from "../components/UrlForm";
import api from "../services/api";
import ScoreCard from "../components/ScoreCard";
import SummaryCard from "../components/SummaryCard";
import RecommendationCard from "../components/RecommendationCard";
import TechnicalCard from "../components/TechnicalCard";
import ContentCard from "../components/ContentCard";
import PerformanceCard from "../components/PerformanceCard";
import ImageCard from "../components/ImageCard";
import LinkCard from "../components/LinkCard";
import AnalysisCard from "../components/AnalysisCard";
import LoadingSpinner from "../components/LoadingSpinner";
import jsPDF from "jspdf";
import Footer from "../components/Footer";
import KeywordCard from "../components/KeywordCard";
import ProgressCard from "../components/ProgressCard";

function Home() {

    const [loading, setLoading] = useState(false);

    const [analysis, setAnalysis] = useState(null);

    const [report, setReport] = useState(null);

    const [error, setError] = useState("");

    const handleAnalyze = async (url) => {

        setError("");

        setLoading(true);

        setAnalysis(null);
        setReport(null);
        setError("");

        try {

            const response = await api.post("/analyze", {
                url
            });

            const jobId = response.data.jobId;

            const interval = setInterval(async () => {

                const result = await api.get(`/results/${jobId}`);

                if (result.data.status === "completed") {

                    clearInterval(interval);

                    setAnalysis(result.data.analysis);

                    setReport(result.data.report);

                    setLoading(false);

                }

                if (result.data.status === "failed") {

                    clearInterval(interval);

                    setAnalysis(null);

                    setReport(null);

                    setError(result.data.message);

                    setLoading(false);

                }

            }, 2000);

        }

       catch (error) {

            setAnalysis(null);

            setReport(null);

            setError(

                error.response?.data?.message ||

                error.message ||

                "Something went wrong."

            );

            setLoading(false);

        }

    };
    const downloadJSON = () => {

        if (!analysis || !report) return;

        const blob = new Blob(

            [
                JSON.stringify(
                    {
                        analysis,
                        report
                    },
                    null,
                    2
                )
            ],

            {
                type: "application/json"
            }

        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "seo-report.json";

        link.click();

        URL.revokeObjectURL(url);

    };

    const downloadPDF = () => {

        if (!analysis || !report) return;

        const pdf = new jsPDF();

        pdf.setFontSize(22);
        pdf.text("SEO Analysis Report", 20, 20);

        pdf.setFontSize(14);

        pdf.text(`SEO Score: ${report.score}/100`, 20, 40);

        pdf.text(`Title: ${analysis.title}`, 20, 55);

        pdf.text(`Response Time: ${analysis.responseTime} ms`, 20, 70);

        pdf.text(`Word Count: ${analysis.wordCount}`, 20, 85);

        pdf.text(`Images: ${analysis.imageCount}`, 20, 100);

        pdf.text(`Internal Links: ${analysis.internalLinks}`, 20, 115);

        pdf.text("Recommendations:", 20, 135);

        let y = 150;

        report.recommendations.forEach((item) => {

            pdf.text(`• ${item}`, 25, y);

            y += 10;

        });

        pdf.save("seo-report.pdf");

    };

    const copyRecommendations = async () => {

        if (!report) return;

        const text = report.recommendations.join("\n");

        await navigator.clipboard.writeText(text);

        alert("Recommendations copied!");
    };

    const clearAnalysis = () => {

        setAnalysis(null);

        setReport(null);

        setError("");

    };

    return (

        <div
            style={{
                maxWidth: "1200px",
                margin: "40px auto",
                padding: "20px"
            }}
        >

            <Header />

            <UrlForm
                onAnalyze={handleAnalyze}
                loading={loading}
            />

            {
                error && (

                    <div
                        style={{
                            background: "#7f1d1d",
                            color: "white",
                            padding: "15px",
                            borderRadius: "8px",
                            marginTop: "20px",
                            marginBottom: "20px"
                        }}
                    >
                        <>
                            <strong
                                style={{
                                    fontSize: "18px"
                                }}
                            >
                                ❌ Analysis Failed
                            </strong>

                            <div
                                style={{
                                    marginTop: "10px",
                                    lineHeight: "24px"
                                }}
                            >
                                {error}
                            </div>

                            <p
                                style={{
                                    marginTop: "15px",
                                    color: "#fecaca",
                                    fontSize: "14px",
                                    lineHeight: "22px"
                                }}
                            >
                                💡 Some modern websites block automated crawlers or require JavaScript rendering. Please try another publicly accessible website.
                            </p>
                        </>
                    </div>

                )
            }

            {
                loading && (
                    <LoadingSpinner />
                )
            }

            {
                !analysis && !loading && (

                    <div
                        className="card"
                        style={{
                            marginTop: "40px",
                            textAlign: "center",
                            padding: "50px"
                        }}
                    >

                        <h2>🚀 Ready to Analyze</h2>

                        <p
                            style={{
                                marginTop: "20px",
                                color: "#cbd5e1"
                            }}
                        >
                            Enter any website URL above and receive a complete SEO report,
                            technical analysis, content insights, performance metrics,
                            image SEO, link analysis and recommendations.
                        </p>

                    </div>

                )
            }

            

        {
            analysis && report && !error && (

                    <div className="fade">

                        <div
                            style={{
                                marginTop: "30px"
                            }}
                        >

                            <div
                                className="card"
                                style={{
                                    marginBottom: "25px",
                                    textAlign: "center"
                                }}
                            >

                                
                                <div
                                    className="card"
                                    style={{
                                        marginBottom: "25px",
                                        textAlign: "center"
                                    }}
                                >

                                    <h3
                                        style={{
                                            color: "#60a5fa",
                                            marginBottom: "12px"
                                        }}
                                    >
                                        🌐 {analysis.url}
                                    </h3>

                                    <p
                                        style={{
                                            color: "#94a3b8",
                                            marginBottom: "20px"
                                        }}
                                    >
                                        📅 {analysis.analysisTime}
                                    </p>

                                    <div
                                        style={{
                                            marginBottom: "15px"
                                        }}
                                    >
                                        <h2
                                            style={{
                                                color: "#22c55e",
                                                marginBottom: "10px"
                                            }}
                                        >
                                            SEO Grade: {report.grade}
                                        </h2>

                                        <ScoreCard
                                            score={report.score}
                                        />
                                    </div>

                                </div>

                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    gap: "15px",
                                    marginTop: "30px",
                                    marginBottom: "35px"
                                }}
                            >

                                <button
                                    onClick={downloadJSON}
                                    style={{
                                        padding: "12px 25px",
                                        borderRadius: "8px",
                                        minWidth: "220px"
                                    }}
                                >
                                    📄 Download JSON Report
                                </button>

                                <button
                                    onClick={downloadPDF}
                                    style={{
                                        padding: "12px 25px",
                                        borderRadius: "8px",
                                        minWidth: "220px"
                                    }}
                                >
                                    📑 Download PDF Report
                                </button>

                                <button
                                    onClick={copyRecommendations}
                                    style={{
                                        padding: "12px 25px",
                                        borderRadius: "8px",
                                        minWidth: "220px"
                                    }}
                                >
                                    📋 Copy Recommendations
                                </button>

                                <button
                                    onClick={clearAnalysis}
                                    style={{
                                        padding: "12px 25px",
                                        borderRadius: "8px",
                                        background: "#dc2626",
                                        minWidth: "220px"
                                    }}
                                >
                                    🔄 Analyze Another Website
                                </button>

                            </div>

                            <div className="dashboard-grid">

                                <SummaryCard
                                    title="Response Time"
                                    value={`${analysis.responseTime} ms`}
                                />

                                <SummaryCard
                                    title="Word Count"
                                    value={analysis.wordCount}
                                />

                                <SummaryCard
                                    title="Images"
                                    value={analysis.imageCount}
                                />

                                <SummaryCard
                                    title="Internal Links"
                                    value={analysis.internalLinks}
                                />

                            </div>

                            <div
                                style={{
                                    marginTop: "30px"
                                }}
                            >

                                <div className="dashboard-grid">

                                    <TechnicalCard analysis={analysis} />
                                    <ContentCard analysis={analysis} />
                                    <PerformanceCard analysis={analysis} />
                                    <ImageCard analysis={analysis} />
                                    <LinkCard analysis={analysis} />
                                    <AnalysisCard analysis={analysis} />
                                    <KeywordCard analysis={analysis} />
                                </div>

                                <div
                                    style={{
                                        marginTop: "30px"
                                    }}
                                >
                                    <div className="card" style={{ marginBottom: "30px" }}>

                                        <h2 style={{ marginBottom: "25px" }}>
                                            📊 SEO Category Scores
                                        </h2>

                                        <ProgressCard
                                            title="Technical SEO"
                                            value={report.technicalScore}
                                            color="#3b82f6"
                                        />

                                        <ProgressCard
                                            title="Content SEO"
                                            value={report.contentScore}
                                            color="#10b981"
                                        />

                                        <ProgressCard
                                            title="Performance"
                                            value={report.performanceScore}
                                            color="#f59e0b"
                                        />

                                        <ProgressCard
                                            title="Overall SEO"
                                            value={report.score}
                                            color="#8b5cf6"
                                        />

                                    </div>
                                    <RecommendationCard
                                        recommendations={report.recommendations}
                                    />
                                </div>

                            </div>

                        </div>

                    </div>

                )
            }

            <Footer />

        </div>

    );

}

export default Home;