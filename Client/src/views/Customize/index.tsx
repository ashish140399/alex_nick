import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import LoaderAnimation from "../components/LoaderAnimation";
import axios from "axios";
import { Footer } from "../../styles";
import Countdown, { zeroPad } from "react-countdown";
interface Props {}
// const timer = Date.now() + 90000;
const Customize: React.FC<Props> = () => {
    const timertime = 90000;
    const [timer, setTimer] = useState(Date.now() + timertime);
    const [selGraphic, setSelGraphic] = useState([]);
    const [graphicinventory, setGraphicinventory] = useState([]);
    const [canvasObjects, setCanvasObjects] = useState([]);
    const [showloader, setShowloader] = useState(false);
    const [canvas, setCanvas] = useState(null);
    const navigate = useNavigate();
    const [designfinalised, setDesignfinalised] = useState(false);
    const [objectadding, setObjectadding] = useState(true);

    const {
        selectedItem,

        setUsagetime,
        usagetime,
        userDetails,
        itemDetails,
        bgimageoverlay,
        stickers,
        flipFlopTemplates,
    } = useContext(MyContext);
    // const [selcdesign, setSelcdesign] = useState(selectedCover);
    const [bgImage2, setBgImage2] = useState(null);
    const [bgImage3, setBgImage3] = useState(null);
    const [screennum, setScreennum] = useState(2);
    console.log(screennum);
    // useEffect(() => {
    //     if (screennum === 2) {
    //         setTimer(Date.now() + 3000);
    //     }
    // }, [screennum]);
    console.log("Setitimer", setTimer);
    var deleteIcon =
        "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

    const toggleArtSelection = (index: any) => {
        setObjectadding(true);
        setSelGraphic([...selGraphic, index]);
    };
    console.log(selGraphic);

    React.useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/fetchGraphic?itemtype=${itemDetails.selected}`
            )
            // .get(`http://localhost:8084/api/fetchsizes`)
            .then((response) => {
                setGraphicinventory(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    console.log("graphicinventory", graphicinventory);
    console.log("bgImage2", bgImage2);
    const updateBgImage2Url = (newImageUrl: string, callback?: () => void) => {
        if (bgImage2) {
            bgImage2.setSrc(newImageUrl, () => {
                if (canvas) {
                    canvas.renderAll();
                    if (callback) {
                        callback();
                    }
                }
            });
        }
        if (itemDetails.selected === "flipflop") {
            if (bgImage3) {
                bgImage3.setSrc(newImageUrl, () => {
                    if (canvas) {
                        canvas.renderAll();
                        if (callback) {
                            callback();
                        }
                    }
                });
            }
        }
    };

    async function processCanvas(itemDetails, canvas) {
        let dataURLpng;
        if (itemDetails.selected === "tshirt") {
            const newCanvas = new fabric.Canvas("maskcanvas");
            const newmultiplier = 4.04;
            newCanvas.setDimensions({
                width: canvas.width * newmultiplier,
                height: canvas.height * newmultiplier,
            });

            try {
                await new Promise((resolve, reject) => {
                    fabric.Image.fromURL(
                        canvas.toDataURL(),
                        function (img) {
                            img.scaleToWidth(newCanvas.width);
                            img.scaleToHeight(newCanvas.height);
                            newCanvas.add(img);
                            newCanvas.renderAll();
                            resolve(newCanvas); // Resolve the promise without parameters
                        },
                        {
                            crossOrigin: "anonymous",
                        }
                    );
                });

                // Export the new canvas to PNG after the image is added and rendered
                dataURLpng = newCanvas.toDataURL({
                    format: "png",
                    quality: 1,
                    multiplier: 1,
                });
                console.log(dataURLpng); // Now dataURLpng is ready to be used
            } catch (error) {
                console.error("Failed to load or process image", error);
            }
        } else {
            if (bgImage3) {
                // Remove the image from the canvas
                canvas.remove(bgImage3);
                dataURLpng = await canvas.toDataURL({
                    format: "png",
                    quality: 10,
                    multiplier: 3.22,
                });
            }
        }

        return dataURLpng; // Return the data URL for further processing or output
    }

    const downloadimage = async () => {
        // URL of the new image to replace bgimage2 with
        // const newImageUrl = `images/templates/Borders/${appDetails.idname}/${selectedItem}_bord.png`;
        setShowloader(true);
        // Replace bgimage2 with the new image, then download
        // updateBgImage2Url(newImageUrl, async () => {
        if (canvas) {
            // var dataURLpng;
            const dataURLpng = await processCanvas(itemDetails, canvas);
            // const modifiedSVG = base64ToSVG(
            //     dataURLpng,
            //     canvas.width,
            //     canvas.height
            // );
            // console.log(modifiedSVG);

            // console.log("dataURLpng", dataURLpng);
            // var modifiedSVG = canvas.toSVG();
            // console.log(dataURL);
            // let modifiedSVG;

            // console.log(modifiedSVG);

            // var blob = new Blob([dataURL], {
            //     type: "image/svg+xml;charset=utf-8",
            // });
            // var url = URL.createObjectURL(blob);

            // var link = document.createElement("a");
            // link.download = `canvas.png`;
            // link.href = dataURLpng;
            // link.click();

            // if (customizeInfo.selected === "graphic") {
            //     modifiedSVG = await replaceImageURLWithBase64(dataURL);
            // } else {
            //     modifiedSVG = await dataURL;
            // }

            // modifiedSVG = await dataURL;

            // var blob = new Blob([modifiedSVG], {
            //     type: "image/svg+xml;charset=utf-8",
            // });
            // var url = URL.createObjectURL(blob);

            // var link = document.createElement("a");
            // link.download = `canvas.svg`;
            // link.href = url;
            // link.click();

            // console.log(modifiedSVG);
            setUsagetime({
                ...usagetime,
                end: new Date(),
            });

            const timeDifference =
                usagetime.start.getTime() - usagetime.end.getTime();
            console.log("timeDifference", timeDifference);
            // console.log(
            //     "LLOGGGGGGGGGGGGGGGGG",
            //     JSON.stringify(userDetails),
            //     selectedItem,
            //     // customizeInfo["graphic"].value.toString(),
            //     JSON.stringify(modifiedSVG),
            //     timeDifference
            // );

            axios
                .post(`${process.env.REACT_APP_API_URL}/api/savepng`, {
                    userDetails: JSON.stringify(userDetails),
                    itemname: JSON.stringify(itemDetails),
                    canvasuri: dataURLpng,
                    timeDiff: timeDifference,
                })
                .then((response) => {
                    console.log(response.data);
                    setShowloader(false);

                    navigate("/thankyou");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        // });
    };

    const canvasRef = useRef(null);

    const rightWrapperRef = useRef(null);

    // creates and saves the canvas element
    useEffect(() => {
        if (canvasRef.current && rightWrapperRef.current) {
            // 2.0219
            if (itemDetails.selected === "flipflop") {
                setCanvas(
                    new fabric.Canvas("demo", {
                        targetFindTolerance: 5,
                        width: 600,
                        height: 712.67,
                    })
                );
            } else {
                setCanvas(
                    new fabric.Canvas("demo", {
                        targetFindTolerance: 5,
                        width: 816.78,
                        height: 970,
                    })
                );
            }
        }
    }, []);
    var img = document.createElement("img");
    img.src = deleteIcon;

    function deleteObject(eventData, transform) {
        var target = transform.target;
        var canvas = target.canvas;
        canvas.remove(target);
        canvas.requestRenderAll();
    }

    function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
    }
    // Add delete control
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: "pointer",
        // @ts-ignore
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 24,
    });

    const reorderCanvasObjects = (e) => {
        if (bgImage2 && e.target !== bgImage2) {
            canvas.moveTo(bgImage2, canvas.getObjects().length - 1);
        }
        if (bgImage3 && e.target !== bgImage3) {
            canvas.moveTo(bgImage3, canvas.getObjects().length - 2);
        }
        canvas.discardActiveObject();
        canvas.renderAll();
    };

    useEffect(() => {
        if (canvas) {
            // canvas.clear();
            // canvas.renderAll();
            if (itemDetails.selected === "flipflop") {
                if (itemDetails.size === "KIDS SMALL") {
                    var zoom = canvas.getZoom();
                    zoom *= 1.35; // Increase the zoom factor by 20%
                    canvas.zoomToPoint(
                        new fabric.Point(canvas.width / 2, canvas.height / 2),
                        zoom
                    );
                } else if (itemDetails.size === "KIDS LARGE") {
                    var zoom = canvas.getZoom();
                    zoom *= 1.1; // Increase the zoom factor by 20%
                    canvas.zoomToPoint(
                        new fabric.Point(canvas.width / 2, canvas.height / 2),
                        zoom
                    );
                }
            }
        }
    }, [canvas]);

    // updates the canvas when the design is finalised
    useEffect(() => {
        if (canvas) {
            const objectarray = canvas.getObjects();

            if (designfinalised) {
                canvas.forEachObject(function (object) {
                    object.selectable = false;
                    object.hasBorders = false;
                    object.hasControls = false;
                });
                // objectarray[1].visible = false;
                canvas.discardActiveObject().renderAll();
            } else {
                for (let i = 0; i < objectarray.length; i++) {
                    objectarray[i].selectable = true;
                    objectarray[i].hasBorders = true;
                    objectarray[i].hasControls = true;
                }

                // objectarray[1].visible = true;
                canvas.setActiveObject(objectarray[0]);
            }
        }
    }, [designfinalised]);
    // generates the canvas at the initial load of the page
    useEffect(() => {
        if (canvas) {
            if (itemDetails.selected === "tshirt") {
                let imgurl1 = `images/common/tshirt_bg.png`;
                let topshift = 0;

                fabric.Image.fromURL(imgurl1, (bgimage2) => {
                    bgimage2.set({
                        scaleX: canvas.width / bgimage2.width,
                        scaleY: canvas.height / bgimage2.height,
                        selectable: false, // Makes the image non-selectable
                        evented: false, // Disables events on the image
                        top: topshift,
                    });
                    bgimage2.name = "borderImage";
                    // Add the second image to the canvas
                    canvas.add(bgimage2);
                    // Store bgimage2 in state
                    setBgImage2(bgimage2);
                    // Move the image to the top
                    canvas.moveTo(bgimage2, canvas.getObjects().length - 1);
                    canvas.renderAll();
                });
            } else if (itemDetails.selected === "flipflop") {
                // let imgurl = `images/templates/flipflop/${itemDetails.size}/bg.png`;
                // let imgurl1 = `images/templates/flipflop/${itemDetails.size}/right.png`;
                // let imgurloverlay = `images/templates/flipflop/KIDS SMALL/bg_overlay.png`;

                let imgurloverlay = flipFlopTemplates?.find(
                    (template) => template[itemDetails.size]
                )[itemDetails.size].bgoverlay;
                let imgurl = flipFlopTemplates?.find(
                    (template) => template[itemDetails.size]
                )[itemDetails.size].bg;
                let imgurl1 = flipFlopTemplates?.find(
                    (template) => template[itemDetails.size]
                )[itemDetails.size].right;
                let imgurl2 = flipFlopTemplates?.find(
                    (template) => template[itemDetails.size]
                )[itemDetails.size].left;

                let topshift = 0;
                fabric.Image.fromURL(imgurl, (bgimage) => {
                    canvas.setBackgroundImage(
                        bgimage,
                        canvas.renderAll.bind(canvas),
                        {
                            scaleX: canvas.width / bgimage.width,
                            scaleY: canvas.height / bgimage.height,
                        }
                    );

                    fabric.Image.fromURL(imgurl1, (bgimage2) => {
                        bgimage2.set({
                            scaleX: canvas.width / bgimage2.width,
                            scaleY: canvas.height / bgimage2.height,
                            selectable: false, // Makes the image non-selectable
                            evented: false, // Disables events on the image
                            top: topshift,
                        });
                        bgimage2.name = "borderImage";
                        // Add the second image to the canvas
                        canvas.add(bgimage2);
                        // Store bgimage2 in state
                        setBgImage2(bgimage2);
                        // Move the image to the top
                        canvas.moveTo(bgimage2, canvas.getObjects().length - 1);
                        fabric.Image.fromURL(imgurloverlay, (bgimage3) => {
                            bgimage3.set({
                                scaleX: canvas.width / bgimage3.width,
                                scaleY: canvas.height / bgimage3.height,
                                selectable: false, // Makes the image non-selectable
                                evented: false, // Disables events on the image
                                top: topshift,
                            });
                            bgimage3.name = "borderImage3";
                            // Add the second image to the canvas
                            canvas.add(bgimage3);
                            // Store bgimage2 in state
                            setBgImage3(bgimage3);
                            // Move the image to the top
                            canvas.moveTo(
                                bgimage3,
                                canvas.getObjects().length - 2
                            );
                            fabric.Image.fromURL(imgurl2, (bgimage4) => {
                                bgimage4.set({
                                    scaleX: canvas.width / bgimage4.width,
                                    scaleY: canvas.height / bgimage4.height,
                                    selectable: false, // Makes the image non-selectable
                                    evented: false, // Disables events on the image
                                    top: topshift,
                                });
                                bgimage4.name = "borderImage4";
                                // Add the second image to the canvas
                                canvas.add(bgimage4);

                                canvas.renderAll();
                            });
                        });
                    });
                });
            }
        }
    }, [canvas]);

    console.log("selGraphic", selGraphic, selGraphic[selGraphic.length - 1]);
    // update the canvas with selected artboard and refresh canvas
    useEffect(() => {
        if (canvas) {
            if (objectadding) {
                // let imgurl = `images/graphics/${
                //     selGraphic[selGraphic.length - 1]
                // }.png`;
                let imgurl =
                    stickers["stick"][selGraphic[selGraphic.length - 1]];

                fabric.Image.fromURL(imgurl, (img) => {
                    // Desired default width and height in pixels
                    let defaultWidth, defaultHeight;
                    if (itemDetails.selected === "tshirt") {
                        defaultWidth = 220;
                        defaultHeight = 220;
                    } else {
                        defaultWidth = 160;
                        defaultHeight = 160;
                    }
                    // Calculate the scale based on the default size
                    const scale = Math.min(
                        defaultWidth / img.width,
                        defaultHeight / img.height
                    );

                    img.set({
                        selectable: true, // allow object to be selected/dragged
                        evented: true,
                        cornerSize: 20,
                        cornerStyle: "circle",
                        transparentCorners: false,
                        hasRotatingPoint: false,
                        lockUniScaling: true, // Maintain aspect ratio while scaling
                        scaleX: scale,
                        scaleY: scale,
                    });

                    canvas.selection = true;
                    canvas.add(img);
                    canvas.centerObject(img);
                    img.set({
                        left: img.left + 110,
                        top: img.top - 100,
                    });
                });
            }
            // Add event listener to reorder objects when new object is added
            canvas.on("object:added", (e) => {
                if (bgImage2 || bgImage3) {
                    reorderCanvasObjects(e);
                }
                canvas.setActiveObject(e.target);
            });
            canvas.on("mouse:down", (e) => {
                if (e.target) {
                    if (canvas.getObjects().length - 1 >= 2)
                        canvas.moveTo(e.target, canvas.getObjects().length - 2);
                }

                // console.log(e);
                console.log("I am object and I am selected");
            });
            canvas.on("object:scaling", function (e) {
                const target = e.target;
                const scale = target.scaleX; // Use scaleX or scaleY, as they are equal

                target.scaleY = scale;
                if (bgImage2) {
                    reorderCanvasObjects(e);
                }
            });

            let paddingTop, paddingBottom, paddingRight, paddingLeft;

            if (itemDetails.selected === "flipflop") {
                paddingTop = 0;
                paddingBottom = 0;
                paddingRight = 0;
                paddingLeft = 0;
            } else {
                paddingTop = 0;
                paddingBottom = 0;
                paddingRight = 0;
                paddingLeft = 0;
            }
            canvas.on("object:moving", function (e) {
                const target = e.target;

                // Constrain movement within canvas boundaries with 10px padding
                if (target.left < paddingLeft) {
                    target.left = paddingLeft;
                }
                if (target.top < paddingTop) {
                    target.top = paddingTop;
                }
                if (
                    target.left + target.width * target.scaleX >
                    canvas.width - paddingRight
                ) {
                    target.left =
                        canvas.width -
                        paddingRight -
                        target.width * target.scaleX;
                }
                if (
                    target.top + target.height * target.scaleY >
                    canvas.height - paddingBottom
                ) {
                    target.top =
                        canvas.height -
                        paddingBottom -
                        target.height * target.scaleY;
                }
                if (bgImage2 || bgImage3) {
                    reorderCanvasObjects(e);
                }
            });

            canvas.on("object:modified", function (e) {
                const target = e.target;
                const padding = 10;

                // Ensure object remains within canvas boundaries after modification
                if (target.left < paddingLeft) {
                    target.left = paddingLeft;
                }
                if (target.top < paddingTop) {
                    target.top = paddingTop;
                }
                if (
                    target.left + target.width * target.scaleX >
                    canvas.width - paddingRight
                ) {
                    target.left =
                        canvas.width -
                        paddingRight -
                        target.width * target.scaleX;
                }
                if (
                    target.top + target.height * target.scaleY >
                    canvas.height - paddingBottom
                ) {
                    target.top =
                        canvas.height -
                        paddingBottom -
                        target.height * target.scaleY;
                }
                if (bgImage2 || bgImage3) {
                    reorderCanvasObjects(e);
                    console.log("in obejctmodify");
                }
            });

            //canvas.on("touch:gesture", function (e) {
            // if (e.e.touches && e.e.touches.length === 2) {
            // e.e.preventDefault();
            // if (canvas.getActiveObject()) {
            //    canvas.getActiveObject().set("active", true);
            // }

            // let scale = canvas.getZoom();
            //  scale *= e.self.scale;
            // scale = Math.max(0.1, Math.min(10, scale)); // set min and max zoom levels
            // canvas.setZoom(scale);
            // canvas.requestRenderAll();
            //}
            //  });

            // Reset distance on touch end
            // canvas.on("touch:gestureend", function () {
            //     this.lastDistance = 0;
            //  });

            // Ensure cleanup to prevent multiple event bindings
            return () => {
                canvas.off("object:added", reorderCanvasObjects);
                canvas.off("mouse:down", reorderCanvasObjects);
                canvas.off("mouse:up", reorderCanvasObjects);
                canvas.off("object:scaling", reorderCanvasObjects);
                canvas.off("object:moving", reorderCanvasObjects);
                canvas.off("object:modified", reorderCanvasObjects);
                // canvas.off("touch:gesture");
                // canvas.off("touch:gestureend");
            };
        }
    }, [selGraphic]);

    const [completed, setCompleted] = useState(false);

    // Using useEffect to handle completion state changes
    useEffect(() => {
        if (completed) {
            setScreennum(3);
            setDesignfinalised(true);
            setCompleted(false);
        }
    }, [completed]); // Only re-run the effect if completed changes
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            setCompleted(true);
            return null; // Render nothing or some completion UI
        } else {
            return <>{zeroPad(minutes * 60 + seconds)}</>;
        }
    };
    return (
        <>
            {showloader && <LoaderAnimation />}

            <Layout bgimageoverlay={bgimageoverlay}>
                {screennum == 2 ? (
                    <h1 className="customize">
                        CUSTOMIZE YOUR{" "}
                        {itemDetails.selected === "tshirt"
                            ? "SHIRT"
                            : "FLIPFLOPS"}
                    </h1>
                ) : (
                    <h1 className="customize">CONFIRM YOUR DESIGN</h1>
                )}
                {screennum === 2 && (
                    <TimeBox>
                        <div className="timelimit">TIME LIMIT</div>
                        <div className="timeleft">
                            <Countdown date={timer} renderer={renderer} />
                            <span>SEC</span>
                        </div>
                    </TimeBox>
                )}
                <Wrapper>
                    <TopWrapper
                        ref={rightWrapperRef}
                        className={`${itemDetails.selected} ${
                            screennum === 2
                                ? "screen2"
                                : screennum === 3
                                ? "screen3"
                                : ""
                        }`}
                    >
                        <canvas ref={canvasRef} id="demo" />
                        <canvas id="maskcanvas" style={{ display: "none" }} />
                        <div className={`itembg ${itemDetails.selected}`}>
                            {itemDetails.selected === "tshirt" && (
                                <img
                                    src={`images/common/${itemDetails.selected}.png`}
                                    className="tshirtbg"
                                    alt=""
                                />
                            )}
                            {/* {itemDetails.selected === "flipflop" && (
                                <img
                                    src={`images/templates/${itemDetails.selected}/${itemDetails.size}/bg.png`}
                                    className="flipbg"
                                    alt=""
                                />
                            )} */}
                        </div>
                    </TopWrapper>
                </Wrapper>
                {screennum === 2 ? (
                    <StyledFooter>
                        <BottomWrapper>
                            <div className="sliderwrapper page2">
                                <div className="selrow1">
                                    {graphicinventory.map((item, index) => {
                                        return (
                                            <SelectorBox
                                                key={index}
                                                onClick={() =>
                                                    toggleArtSelection(
                                                        item.graphic_img_name
                                                    )
                                                }
                                            >
                                                <img
                                                    // src={`images/graphics/${item.graphic_img_name}_btn.png`}
                                                    src={`${
                                                        stickers["btn"][
                                                            Number(
                                                                item.graphic_img_name
                                                            )
                                                        ]
                                                    }`}
                                                    alt=""
                                                />
                                            </SelectorBox>
                                        );
                                    })}
                                </div>
                            </div>
                        </BottomWrapper>

                        <Link className="nav-link" to="/infochoose">
                            <button className="btnglobal btnleft">
                                <img
                                    src="images/common/button_back.png"
                                    alt=""
                                />
                            </button>
                        </Link>
                        <div className="footercentertext">
                            Swipe and tap on the graphics to add them to your
                            {itemDetails.selected === "tshirt"
                                ? " shirt"
                                : " flip flops"}
                            . Then pinch out and in to change size
                        </div>

                        <button
                            className="btnglobal btnright"
                            onClick={() => {
                                setScreennum(3);
                                setDesignfinalised(true);
                            }}
                        >
                            <img src="images/common/button_next.png" alt="" />
                        </button>
                    </StyledFooter>
                ) : (
                    <StyledFooter className="footerfinal">
                        <button
                            className="btnglobal btnleft"
                            onClick={() => {
                                setScreennum(2);
                                setDesignfinalised(false);
                                setTimer(Date.now() + timertime);
                            }}
                            style={{ opacity: 0 }}
                        >
                            <img src="images/common/button_back.png" alt="" />
                        </button>

                        <button
                            className="btnglobal btnright"
                            onClick={() => downloadimage()}
                        >
                            <img src="images/common/button_next.png" alt="" />
                        </button>
                    </StyledFooter>
                )}
                <img
                    src="images/common/logo_btm.png"
                    className="logo_btm"
                    alt=""
                />
            </Layout>
        </>
    );
};
const TimeBox = styled.div`
    border: 3px solid #000;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: fixed;
    right: 7vw;
    top: 185px;
    padding: 5px 20px;
    z-index: 99999;
    .timelimit {
        color: #ff00f5;
        text-align: center;
        -webkit-text-stroke-width: 3;
        -webkit-text-stroke-color: #000;
        font-family: Roc_Grotesk_Heavy;
        font-size: 28px;
        font-style: normal;
        font-weight: 00;
        line-height: 44px; /* 156.25% */
    }
    .timeleft {
        color: #fff;
        text-align: center;
        -webkit-text-stroke-width: 3;
        -webkit-text-stroke-color: #000;
        font-family: Roc_Grotesk_Heavy;
        font-size: 62px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        display: flex;
        align-items: center;
        line-height: 60px;
        span {
            color: #ff00f5;
            text-align: center;
            -webkit-text-stroke-width: 3;
            -webkit-text-stroke-color: #000;
            font-family: Roc_Grotesk_Heavy;
            font-size: 32px;
            font-style: normal;
            margin-left: 10px;
            font-weight: 900;
            line-height: 50px; /* 156.25% */
        }
    }
`;
const StyledFooter = styled(Footer)`
    .footercentertext {
        border-radius: 7px;
        border: 3px solid #000;
        background: #9d4798;
        color: #fff;
        text-align: center;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        -webkit-text-stroke-width: 0.25;
        -webkit-text-stroke-color: #fff;
        font-family: fontspring;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        padding: 10px 16px 10px 16px;
        margin-top: -8px;
        // min-width: 400px;
        width: 50vw;
    }
`;
const Layout = styled.div<{
    bgimageoverlay: string;
}>`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 100vh;
    max-width: 100vw;
    overflow: hidden;
    // padding-top: 66px;
    background: url(${(props) => props.bgimageoverlay});
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    .customize {
        width: 100vw;
        border: 3px solid #000;
        background: rgba(0, 0, 0, 0.5);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        box-sizing: border-box;
        font-family: Roc_Grotesk_Heavy;
        font-weight: 300 !important;
        color: #fff;
        font-size: 50px;
        text-transform: uppercase;
        letter-spacing: 3px;
        margin: 0;
        text-align: center;
        font-weight: 100;
        padding: 8px 0;
        padding-top: 12px;
        margin-top: 50px;
        position: absolute;
        left: 0;
        // padding-bottom: 0px;
        margin-bottom: 20px;
        filter: drop-shadow(0 3px 6px #000);
        z-index: 999;
        width: 86vw;
        left: 50%;
        transform: translateX(-50%);
    }
`;

const SelectorBox = styled.div`
    // background: #fff;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    // padding: 6px;
    margin: 0 10px;
    box-sizing: border-box;
    // border: 2px solid #000;
    // border-radius: 22px;
    cursor: pointer;
    width: 150px;
    min-width: 150px;
    // max-width: 150px;
    // height: 100px;
    // min-height: 100px;
    // max-height: 100px;
    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        transform: scaleX(-1);
    }
`;
const BottomWrapper = styled.div`
    padding: 0px;
    // width: 400px;
    // max-height: calc(100vh - 184px);
    box-sizing: border-box;
    position: absolute;

    // padding: 15px 0;
    left: 0;
    bottom: 190px;
    .sliderwrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-x: hidden;
        max-width: 100vw;
        .selrow1 {
            display: flex;
            align-items: flex-end;
            width: 100%;
            overflow-x: auto; /* Enables horizontal scrolling */
            white-space: nowrap;
            // transform: translateX(-50%);
        }
        // .selrow1,
        // .selrow2 {
        //     position: absolute;
        //     height: 58vh;
        //     overflow: hidden;
        //     display: flex;
        //     flex-direction: column;
        //     flex-wrap: wrap;
        //     justify-content: center;
        //     top: 24.7vh;
        //     ${SelectorBox} {
        //         height: 12.5vh;
        //         width: 12.5vh;
        //         margin-bottom: 14px;
        //         margin-right: 14px;
        //         img {
        //             width: 100%;
        //             height: 100%;
        //             object-fit: contain;
        //         }
        //     }
        // }
    }
`;

const TopWrapper = styled.div`
    // background: #fff;
    height: auto;
    // width: 85vw;
    // height: 700px;
    box-sizing: border-box;
    // margin-bottom: 60px;
    // overflow: hidden;
    display: flex;
    align-items: Center;
    justify-content: Center;
    // display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &.flipflop {
        top: 45%;
    }
    canvas {
        width: 100%;
        height: 100%;
    }
    &.screen2 {
        // margin-top: -20px;
        // transform: scale(0.9);
    }
    &.screen1 {
        transform: scale(0.96);
    }
    &.screen3 {
        transform: translate(-50%, -50%) scale(1);
        &.flipflop {
            transform-origin: center;
            left: 50% !important;
            top: 50%;
            transform: translate(-50%, -50%) scale(1.2);
        }
    }
`;
const Wrapper = styled.div`
    display: flex;
    // border-top: 1px solid #707070;
    flex-direction: column;
    .itembg {
        position: absolute;
        left: 0;
        z-index: -1;

        &.tshirt {
            position: fixed;
            transform: translate(-10vw, 1vh);
            left: 0;
            width: 100vw;
            height: 100vh;
            .tshirtbg {
                width: 100%;
                object-fit: contain;
                transform: scale(1.06);
            }
        }
        &.flipflop {
            .flipbg {
                width: 100%;
                object-fit: contain;
            }
        }
    }
`;
// const StyledFooter = styled.div`
//     padding-top: 0;
//     padding-bottom: 0;
//     // margin-bottom: 30px;
//     width: 100%;
//     // position: absolute;
//     bottom: 0;
//     box-sizing: border-box;

//     .footerflex {
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         padding: 18px 33px 37px 33px;
//         // margin-top:15px;
//         &.screen1 {
//             margin-top: 15px;
//         }
//     }
//     button {
//         cursor: pointer;
//         margin: 0;
//         display: flex;
//         // align-items: center;
//         // img {
//         //     width: 100%;
//         //     height: auto;
//         // }
//     }
//     .footerleft {
//         display: flex;
//         align-items: center;
//         // width: 30vw;
//     }
//     .footercenter {
//         .text {
//             text-align: center;
//             color: #fff;
//             font-family: Emberregular;
//             font-size: 20px;
//             font-weight: 400;
//             margin-top: 0px;
//         }
//     }
//     .footerright {
//         display: flex;
//         align-items: center;
//         justify-content: flex-end;
//     }
//     &.footerfinal {
//         // background: Transparent;
//         // .footerright {
//         //     button {
//         //         width: 210px;
//         //     }
//         // }
//     }
// `;

export default Customize;
