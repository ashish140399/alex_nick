import * as React from "react";
import styled from "styled-components";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { Footer } from "../../styles";
import axios from "axios";

interface Props {}

const InfoChoose: React.FC<Props> = () => {
    const [sizeaccept, setSizeaccept] = React.useState<string>("");
    const [pagetype, setPagetype] = React.useState<string>("selectsize");

    // const [selectedCover, setSelectedItem] = useState(selectedGradient);
    const [inventory, setInventory] = React.useState([]);
    const {
        selectedItem,
        setSelectedItem,
        appDetails,
        itemDetails,
        setItemDetails,
    } = React.useContext(MyContext);

    const handleAcceptChange = (event: SelectChangeEvent) => {
        setSizeaccept(String(event.target.value));
    };

    React.useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/fetchinventory?itemtype=${itemDetails.selected}`
            )
            // .get(`http://localhost:8084/api/fetchsizes`)
            .then((response) => {
                console.log(response.data);
                setInventory(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    console.log(inventory);

    // React.useEffect(() => {
    //     if (inventory) {
    //         let temparr = [];
    //         inventory.map((item, index) => {
    //             if (item.is_active) {
    //                 temparr.push(item.size);
    //             }
    //         });
    //         setAvlsizearr(temparr);
    //         setSizeaccept(temparr[0]);
    //     }
    // }, [inventory]);

    React.useEffect(() => {
        setSelectedItem(sizeaccept);
    }, [sizeaccept]);
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
    return (
        <>
            <Layout>
                <RowBox>
                    <h1>
                        CHOOSE THE ITEM YOU
                        <br /> WANT TO CUSTOMIZE
                    </h1>
                    {pagetype === "selectitem" && (
                        <div className="selectwrapper">
                            <div
                                className={`selectbox ${
                                    itemDetails.selected === "tshirt"
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setItemDetails({
                                        ...itemDetails,
                                        selected: "tshirt",
                                    })
                                }
                            >
                                <img src="images/common/tshirt.png" alt="" />
                            </div>
                            <div
                                className={`selectbox ${
                                    itemDetails.selected === "flipflop"
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setItemDetails({
                                        ...itemDetails,
                                        selected: "flipflop",
                                    })
                                }
                            >
                                <img src="images/common/flipflop.png" alt="" />
                            </div>
                        </div>
                    )}
                    {pagetype === "selectsize" && (
                        <div className="selectsizeWrapper">
                            <img
                                src={`images/common/${itemDetails.selected}.png`}
                                className="selecteditem"
                                alt=""
                            />
                            <FormControl fullWidth>
                                <Select
                                    labelId="timeSelect"
                                    id="timeSelect"
                                    defaultValue={sizeaccept}
                                    value={sizeaccept}
                                    onChange={handleAcceptChange}
                                    displayEmpty
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return (
                                                <span style={{ color: "#fff" }}>
                                                    Size
                                                </span>
                                            );
                                        }
                                        return selected;
                                    }}
                                >
                                    {inventory.length > 0 &&
                                        inventory.map((item) => (
                                            <MenuItem
                                                key={item.iv}
                                                value={item.item_name}
                                                className={`${
                                                    item.used_count >=
                                                    item.available_items
                                                        ? "disabled"
                                                        : ""
                                                }`}
                                            >
                                                {item.item_name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                    )}
                </RowBox>
                {pagetype === "selectitem" && (
                    <Footer>
                        <Link className="nav-link" to="/info">
                            <button className="btnglobal btnleft">
                                <img
                                    src="images/common/button_back.png"
                                    alt=""
                                />
                            </button>
                        </Link>

                        <button
                            className="btnglobal btnright"
                            disabled={
                                itemDetails.selected === "" ? true : false
                            }
                            onClick={() => setPagetype("selectsize")}
                        >
                            <img src="images/common/button_next.png" alt="" />
                        </button>
                    </Footer>
                )}
                {pagetype === "selectsize" && (
                    <Footer>
                        <button
                            className="btnglobal btnleft"
                            onClick={() => setPagetype("selectitem")}
                        >
                            <img src="images/common/button_back.png" alt="" />
                        </button>

                        <Link className="nav-link" to="/customize">
                            <button
                                className="btnglobal btnright"
                                disabled={selectedItem === "" ? true : false}
                            >
                                <img
                                    src="images/common/button_next.png"
                                    alt=""
                                />
                            </button>
                        </Link>
                    </Footer>
                )}
            </Layout>
        </>
    );
};
const RowBox = styled.div`
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
        color: #fff;
        width: 100%;
        text-align: center;
        font-size: 54px;
        font-family: Roc_Grotesk_Heavy;
        padding: 10px;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        box-sizing: border-box;
        width: 86vw;
        top: 40px;

        letter-spacing: 3px;
    }
    input {
        width: 100%;
        margin: 0;
        border: 1px solid rgba(0, 0, 0, 0.4);
        font-size: 54px;
        outline: 0;
        padding: 10px 15px;
        box-sizing: border-box;
        text-align: center;
        filter: drop-shadow(0 3px 6px #000);
        &::placeholder {
            color: rgba(112, 112, 112, 0.19);
            font-weight: 600;
        }
    }
    .MuiInputBase-formControl {
        color: #fff !important;
        font-size: 54px !important;
        background: #000;
        font-family: Roc_Grotesk_Heavy;
        width: 40vw !important;
        display: block;
        margin: auto;
        .MuiInputBase-input {
            padding: 8px 18px !important;
        }
        .MuiOutlinedInput-notchedOutline {
            border: 0px solid #fff !important;
            border-radius: 0 !important;
        }
        .MuiSvgIcon-root {
            font-size: 160px !important;
            color: #fff !important;
            margin-right: -20px;
        }
    }
    .selectwrapper {
        display: flex;
        align-items: center;
        .selectbox {
            width: 50%;
            padding: 30px 40px;
            border: 4px solid transparent;
            img {
                height: 100%;
                width: 100%;
                object-fit: contain;
            }
            &.active {
                border-radius: 20px;
                border: 4px solid #edfe2f;
                background: #4ca7da;
            }
        }
    }
`;
const Layout = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    background: url(/images/common/bg.png);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    min-width: 280px;
    padding: 0 7vw;
    .selectsizeWrapper {
        .selecteditem {
            height: 50vh;
            width: auto;
            display: block;
            margin: auto;
            margin-bottom: 90px;
            margin-top: 120px;
        }
    }
`;

export default InfoChoose;
