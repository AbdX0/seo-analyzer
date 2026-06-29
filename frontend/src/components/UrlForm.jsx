import { useState } from "react";

function UrlForm({ onAnalyze, loading }) {

    const [url, setUrl] = useState("");

    const handleSubmit = (event) => {

        event.preventDefault();

        if (!url.trim()) {

            alert("Please enter a website URL.");

            return;

        }

        onAnalyze(url);

    };

    return (

        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                gap: "10px",
                marginBottom: "30px"
            }}
        >

            <input
                type="text"
                placeholder="https://example.com"
                value={url}
                disabled={loading}
                onChange={(event) =>
                    setUrl(event.target.value)
                }
                style={{
                    width: "100%",
                    padding: "18px 22px",
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,.08)",
                    background: "#1e293b",
                    color: "white",
                    fontSize: "18px"
                }}
            />

            <button
                type="submit"
                disabled={loading}
                style={{
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "8px",
                    background: loading
                        ? "#6b7280"
                        : "#2563eb",
                    color: "white",
                    cursor: loading
                        ? "not-allowed"
                        : "pointer",
                    fontWeight: "bold"
                }}
            >
                {
                    loading
                        ? "Analyzing..."
                        : "Analyze"
                }
            </button>

        </form>

    );

}

export default UrlForm;