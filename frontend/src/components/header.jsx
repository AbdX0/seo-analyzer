import { FaRocket } from "react-icons/fa";

function Header() {

    return (

        <header
            style={{
                textAlign: "center",
                marginBottom: "30px"
            }}
        >

            <h1>

                <FaRocket
                    style={{
                        marginRight: "10px"
                    }}
                />

                SEO Analyzer

            </h1>

            <p
                style={{
                    maxWidth: "700px",
                    margin: "10px auto",
                    lineHeight: 1.7
                }}
            >
                Analyze any website for SEO issues, technical SEO, content quality,
                performance, images, links and receive actionable recommendations.
            </p>

        </header>

    );

}

export default Header;