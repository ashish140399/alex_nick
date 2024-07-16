import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {}

const Welcome: React.FC<Props> = () => {
    const [showlog, setShowlog] = React.useState(false);
    return (
        <>
            <Link className="nav-link" to="/info">
                <Layout>
                    
                </Layout>
            </Link>
        </>
    );
};
const Layout = styled.div`
    background: url(/images/common/welcome.png);
    background-size: 100% 100%;
    background-position: center;
    background-repeat:no-repeat;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    position: relative;
    .name {
        width: 50vw;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .logo {
        height: auto;
        width: 20vw;
        position: absolute;
        bottom: 7vh;
        left: 50%;
        transform: translateX(-50%);
        display: none;
    }
`;

export default Welcome;
