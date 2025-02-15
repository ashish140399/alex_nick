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
    setBgimage: (design) => {},
    bgimageoverlay: null,
    setBgimageoverlay: (design) => {},
    flipFlopTemplates: null,
    setFlipFlopTemplates: (design) => {},
    stickers: { stick: [], btn: [] },
    setStickers: (design) => {},
    inventoryDetails: [],
    setInventoryDetails: (design) => {},
    usagetime: { start: new Date(), end: new Date() },
    setUsagetime: (design) => {},
    itemDetails: {
        selected: "",
        size: "",
    },
    setItemDetails: (design) => {},
    selectimage: {
        tshirt: "",
        flipflop: "",
    },
    setSelectimage: (design) => {},
});
function App() {
    React.useEffect(() => {
        localStorage.clear();
    }, []);
    // const location = useLocation();
    const [selectimage, setSelectimage] = React.useState({
        tshirt: "",
        flipflop: "",
    });
    const [bgimage, setBgimage] = React.useState(null);
    const [bgimageoverlay, setBgimageoverlay] = React.useState(null);
    const [stickers, setStickers] = React.useState({ stick: [], btn: [] });
    const [flipFlopTemplates, setFlipFlopTemplates] = React.useState(null);

    // const [selectimage, setSelectimage] = React.useState(() => {
    //     const savedimage = localStorage.getItem("selectimage");
    //     return savedimage
    //         ? JSON.parse(savedimage)
    //         : {
    //               tshirt: "",
    //               flipflop: "",
    //           };
    // });
    // const [bgimage, setBgimage] = React.useState(() => {
    //     const savedBgimage = localStorage.getItem("bgimage");
    //     return savedBgimage ? JSON.parse(savedBgimage) : null;
    // });
    // const [bgimageoverlay, setBgimageoverlay] = React.useState(() => {
    //     const savedBgimageoverlay = localStorage.getItem("bgimageoverlay");
    //     return savedBgimageoverlay ? JSON.parse(savedBgimageoverlay) : null;
    // });

    // const [stickers, setStickers] = React.useState(() => {
    //     const savedStickers = localStorage.getItem("stickers");
    //     return savedStickers
    //         ? JSON.parse(savedStickers)
    //         : { stick: [], btn: [] };
    // });

    // const [flipFlopTemplates, setFlipFlopTemplates] = React.useState(() => {
    //     const savedFlipFlopTemplates =
    //         localStorage.getItem("flipFlopTemplates");
    //     return savedFlipFlopTemplates
    //         ? JSON.parse(savedFlipFlopTemplates)
    //         : null;
    // });
    // React.useEffect(() => {
    //     localStorage.setItem("bgimage", JSON.stringify(bgimage));
    //     localStorage.setItem("bgimageoverlay", JSON.stringify(bgimageoverlay));
    //     localStorage.setItem(
    //         "flipFlopTemplates",
    //         JSON.stringify(flipFlopTemplates)
    //     );
    //     localStorage.setItem("stickers", JSON.stringify(stickers));
    //     localStorage.setItem("selectimage", JSON.stringify(selectimage));
    // }, [bgimage, bgimageoverlay, flipFlopTemplates, stickers, selectimage]);

    React.useEffect(() => {
        // Dynamically generate the array of sticker paths
        const stickerPaths = Array.from(
            { length: 20 },
            (_, i) => `./images/graphics/${i}.png`
        );
        const stickerbuttonPaths = Array.from(
            { length: 20 },
            (_, i) => `./images/graphics/${i}_btn.png`
        );

        const loadSticker = async (stickerPath) => {
            const response = await fetch(stickerPath);
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        };

        const loadStickers = async () => {
            const promises = stickerPaths.map((path) => loadSticker(path));
            const loadedStickers = await Promise.all(promises);

            const promisesbtn = stickerbuttonPaths.map((path) =>
                loadSticker(path)
            );
            const loadedStickersbtn = await Promise.all(promisesbtn);
            setStickers({ stick: loadedStickers, btn: loadedStickersbtn });
        };
        const baseflipflopPath = "./images/templates/flipflop/";
        const flipfloppaths = [
            "ADULT LARGE",
            "ADULT MEDIUM",
            "ADULT SMALL",
            "KIDS LARGE",
            "KIDS SMALL",
        ];

        const loadflipflop = async (path, type) => {
            const response = await fetch(
                `${baseflipflopPath}${path}/${type}.png`
            );
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        };

        const loadflipfloptemplates = async () => {
            const promises = flipfloppaths.map(async (path) => ({
                [path]: {
                    bgoverlay: await loadflipflop(path, "bg_overlay"),
                    bg: await loadflipflop(path, "bg"),
                    left: await loadflipflop(path, "left"),
                    right: await loadflipflop(path, "right"),
                },
            }));
            const loadedflipfloptemplates = await Promise.all(promises);
            setFlipFlopTemplates(loadedflipfloptemplates);
        };

        const loadSelectImage = async () => {
            const promisetshirt = await loadSticker(
                "images/common/tshirtshow.png"
            );
            const promiseflipflop = await loadSticker(
                "images/common/flipflop.png"
            );
            const promisevar = {
                tshirt: promisetshirt,
                flipflop: promiseflipflop,
            };

            setSelectimage(promisevar);
        };

        // Trigger loading of stickers if not already loaded
        if (stickers?.btn?.length === 0) {
            loadflipfloptemplates();
            loadStickers();
            loadSelectImage();
        }
    }, [stickers]);
    React.useEffect(() => {
        const loadImage = async () => {
            const response = await fetch("./images/common/bg.png");
            const blob = await response.blob();
            const src = URL.createObjectURL(blob);
            setBgimage(src);

            const responseoverlay = await fetch(
                "./images/common/bg_overlay.png"
            );
            const bloboverlay = await responseoverlay.blob();
            const srcoverlay = URL.createObjectURL(bloboverlay);
            setBgimageoverlay(srcoverlay);
        };

        if (!bgimage || !bgimageoverlay) {
            loadImage();
        }
    }, [bgimage, bgimageoverlay]);
    // console.log("bgimage", bgimage);
    console.log(window.location.pathname);
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
    console.log("stickers", stickers);
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

                itemDetails,
                setItemDetails,
                bgimage,
                setBgimage,
                stickers,
                setStickers,
                flipFlopTemplates,
                setFlipFlopTemplates,
                bgimageoverlay,
                setBgimageoverlay,
                selectimage,
                setSelectimage,
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
