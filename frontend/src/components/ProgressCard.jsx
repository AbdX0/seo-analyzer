function ProgressCard({ title, value, color }) {
    return (
        <div
            style={{
                marginBottom: "20px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    fontWeight: "bold"
                }}
            >
                <span>{title}</span>
                <span>{value}%</span>
            </div>

            <div
                style={{
                    width: "100%",
                    height: "12px",
                    background: "#334155",
                    borderRadius: "999px",
                    overflow: "hidden"
                }}
            >
                <div
                    style={{
                        width: `${value}%`,
                        height: "100%",
                        background: color,
                        transition: "1s ease"
                    }}
                />
            </div>
        </div>
    );
}

export default ProgressCard;