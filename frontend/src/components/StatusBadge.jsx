function StatusBadge({ status }) {

    const good =
        status === "Good" ||
        status === "Present" ||
        status === "Secure";

    return (

        <span
            style={{
                background: good ? "#22c55e" : "#ef4444",
                color: "white",
                padding: "6px 14px",
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: "13px",
                minWidth: "120px",
                textAlign: "center",
                display: "inline-block"
            }}
        >
            {status}
        </span>

    );

}

export default StatusBadge;