import * as React from "react";
import styled from "styled-components";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import axios from "axios";

interface Props {}

const Info: React.FC<Props> = () => {
    const { userDetails, setUserDetails, setUsagetime, usagetime, bgimage } =
        React.useContext(MyContext);

    const handleinputChange = (e) => {
        setUserDetails((prevState) => ({
            ...prevState,
            firstName: e.target.value,
        }));
    };
    React.useEffect(() => {
        setUsagetime({
            ...usagetime,
            start: new Date(),
        });
    }, []);
    React.useEffect(() => {
        const handleInputBlur = () => {
            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: "smooth", // optional smooth scrolling
            });
        };

        // Add event listener for input blur
        document.addEventListener("blur", handleInputBlur, true);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("blur", handleInputBlur, true);
        };
    }, []);
    React.useEffect(() => {
        const handleInputBlur = () => {
            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: "smooth", // optional smooth scrolling
            });
        };

        // Add event listener for input blur
        document.addEventListener("blur", handleInputBlur, true);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("blur", handleInputBlur, true);
        };
    }, []);

    const formatPhoneNumber = (input) => {
        const cleaned = input.replace(/\D/g, ""); // Remove non-numeric characters
        const maxLength = 10;

        if (cleaned.length <= 3) {
            return cleaned;
        } else if (cleaned.length <= 6) {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3, maxLength)}`;
        } else {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(
                3,
                6
            )}-${cleaned.slice(6, maxLength)}`;
        }
    };
    const handleNumberChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = formatPhoneNumber(inputValue);
        console.log(inputValue, formattedValue);
        setUserDetails((prevState) => ({
            ...prevState,
            phonenumber: formattedValue,
        }));
    };
    return (
        <>
            <Layout bgimage={bgimage}>
                <RowBox>
                    <h1>NAME</h1>
                    <input
                        type="text"
                        value={userDetails.firstName}
                        onChange={(e) =>
                            setUserDetails((prevState) => ({
                                ...prevState,
                                firstName: e.target.value,
                            }))
                        }
                    />
                </RowBox>
                <RowBox>
                    <h1>PHONE NUMBER</h1>
                    <input
                        type="text"
                        value={userDetails.phonenumber}
                        onChange={handleNumberChange}
                    />
                </RowBox>
                <RowBox className="info">
                    By Clicking Next, I acknowledge and agree to RECEIVING A ONE
                    TIME TEXT MESSAGE NOTIFYING YOU THAT YOUR ORDER IS READY FOR
                    PICK UP. <span>the Paramount Terms of Service</span>, and
                    acknowledge the <a href="#">Paramount Privacy Policy.</a>
                </RowBox>

                <Footer>
                    <Link className="nav-link" to="/infochoose">
                        <button
                            className="btnglobal btnright"
                            disabled={
                                !userDetails.firstName ||
                                !userDetails.phonenumber
                            }
                        >
                            <img src="images/common/button_next.png" alt="" />
                        </button>
                    </Link>
                </Footer>

                <img
                    src="images/common/logo_btm.png"
                    className="logo_btm"
                    alt=""
                />
            </Layout>
        </>
    );
};
const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 60px;
    // position: absolute;
    width: 100%;
    // padding: 0 40px 34px 40px;
    // bottom: 0;
    box-sizing: border-box;
`;
const RowBox = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 100%;
    &:last-child {
        margin-bottom: 0;
    }
    h1 {
        border: 3px solid #000;
        background: rgba(0, 0, 0, 0.5);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        box-sizing: border-box;
        width: 100%;
        color: #fff;
        text-align: center;
        font-family: Roc_Grotesk_Heavy;
        font-size: 70px;
        font-weight: 300 !important;
        letter-spacing: 3px;
        margin-bottom: 16px;
        // position: absolute;
        // top: -120px;
        // left: 50%;
        // transform: translateX(-50%);
        white-space: nowrap;
    }
    input {
        width: 100%;
        margin: 0;
        border: 3px solid #000;
        background: rgba(0, 0, 0, 0.5);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        font-size: 54px;
        outline: 0;
        padding: 10px 15px;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
        font-family: Roc_Grotesk_Heavy;
        &::placeholder {
            color: rgba(112, 112, 112, 0.19);
            font-weight: 600;
        }
    }
    &.info {
        border: 3px solid #000;
        background: rgba(0, 0, 0, 0.5);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        color: #fff;
        text-align: center;
        padding: 8px;
        margin-top: 14px;
        span,
        a {
            color: #d7e534;
        }
    }
`;
const Layout = styled.div<{
    bgimage: string;
}>`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    background: url(${(props) => props.bgimage});
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    min-width: 280px;
    padding: 0 15vw;
    // .logo_btm {
    //     position: absolute;
    //     width: 30vw;
    //     bottom: 10px;
    // }

    .enter_button {
        background: #2c3296;
        border: 0;
        font-size: 30px;
        color: #fff;
        outline: 0;
        width: 124px;
        height: 51px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }
`;

export default Info;
