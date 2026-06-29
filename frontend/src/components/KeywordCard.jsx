function KeywordCard({ analysis }) {

    return (

        <div className="card">

            <h2>🔥 Top Keywords</h2>

            {

                analysis.topKeywords.map(([word, count]) => (

                    <div
                        key={word}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "8px 0",
                            borderBottom: "1px solid #374151"
                        }}
                    >

                        <strong>{word}</strong>

                        <span>{count}</span>

                    </div>

                ))

            }

        </div>

    );

}

export default KeywordCard;