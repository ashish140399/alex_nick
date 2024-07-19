import React, { createContext } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Admin from "./views/Admin";
import Customize from "./views/Customize";
import Info from "./views/Info";
import Thankyou from "./views/Thankyou";
import Welcome from "./views/Welcome";
import styled from "styled-components";
import InfoChoose from "./views/InfoChoose";
import Inventory from "./views/Inventory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @ts-ignore
export const MyContext = createContext({
    userDetails: {
        firstName: "",
        phonenumber: "",
    },
    setUserDetails: (design) => {},
    appDetails: {
        id: 1,
        idname: "",
        name: "",
    },
    customizeInfo: {
        selected: "",

        graphic: {
            value: "",
            font: 1,
            border: 1,
        },
    },
    setCustomizeInfo: (design) => {},
    selectedItem: "",
    setSelectedItem: (design) => {},
    bgimage: null,
    setBgmage: (design) => {},
    inventoryDetails: [],
    setInventoryDetails: (design) => {},
    usagetime: { start: new Date(), end: new Date() },
    setUsagetime: (design) => {},
    itemDetails: {
        selected: "",
        size: "",
    },
    setItemDetails: (design) => {},
});
function App() {
    // const location = useLocation();
    const [bgimage, setBgmage] = React.useState(null);
    React.useEffect(() => {
        const loadImage = async () => {
            const response = await fetch("./images/common/bg.png");
            const blob = await response.blob();
            const src = URL.createObjectURL(blob);
            setBgmage(src);
        };

        if (!bgimage) {
            loadImage();
        }
    }, [bgimage]);
    console.log("bgimage", bgimage);
    console.log(window.location.pathname);
    const [appDetails, setAppDetails] = React.useState({
        id: 4,
        idname: "app4",
        name: "Gov Ball",
    });
    const [itemDetails, setItemDetails] = React.useState({
        selected: "",
        size: "",
    });
    const [inventoryDetails, setInventoryDetails] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState("");
    const [usagetime, setUsagetime] = React.useState({
        start: new Date(),
        end: new Date(),
    });
    const [customizeInfo, setCustomizeInfo] = React.useState({
        selected: "graphic",
        graphic: {
            value: "",
            font: 1,
            border: null,
        },
    });

    const [userDetails, setUserDetails] = React.useState({
        firstName: "",
        phonenumber: "",
    });

    console.log(itemDetails);
    const location = useLocation();
    return (
        <MyContext.Provider
            value={{
                userDetails,
                setUserDetails,
                selectedItem,
                setSelectedItem,
                customizeInfo,
                setCustomizeInfo,
                inventoryDetails,
                setInventoryDetails,
                usagetime,
                setUsagetime,
                appDetails,
                itemDetails,
                setItemDetails,
                bgimage,
                setBgmage,
            }}
        >
            <ToastContainer />

            <TransitionGroup>
                <CSSTransition
                    key={location.pathname}
                    timeout={300}
                    classNames="flip"
                >
                    <Routes location={location}>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/info" element={<Info />} />
                        <Route path="/infochoose" element={<InfoChoose />} />
                        <Route path="/customize" element={<Customize />} />
                        <Route path="/thankyou" element={<Thankyou />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/inventory" element={<Inventory />} />
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </MyContext.Provider>
    );
}

export default App;
