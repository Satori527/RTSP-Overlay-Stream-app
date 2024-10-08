/* eslint-disable react/no-unknown-property */
import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { BiEdit, BiLoaderCircle } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaRegCircle, FaStar } from "react-icons/fa6";
import { GiArrowCursor } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IoMdCloudUpload, IoMdDownload } from "react-icons/io";
import { IoText, IoTrashBinOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { TbRectangle } from "react-icons/tb";
import {
    Arrow,
    Circle,
    Layer,
    Line,
    Rect,
    Stage,
    Star,
    Transformer
} from "react-konva";
import { v4 as uuidv4 } from "uuid";
import { axiosAPI } from '../api/axiosAPI.js';
import { EditableText } from "../components/EditableText.jsx";
import { ACTIONS } from "../constants.js";
//import React, { useEffect, useState } from 'react';

function generateShapes() {
    return [...Array(10)].map((_, i) => ({
        id: i.toString(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 180,
        isDragging: false,
    }));
}

const INITIAL_STATE = generateShapes();

const Overlay = () => {

    //user auth check
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status)
    useEffect(() => {
        if(!authStatus){
            console.log("Not logged in")
            navigate("/login")
        }
    }), [authStatus]
    


    const userData = useSelector((state) => state.auth.userData);
        

    const stageRef = useRef();
    const [action, setAction] = useState(ACTIONS.SELECT);
    const [fillColor, setFillColor] = useState("#ff0000");
    const [rectangles, setRectangles] = useState([]);
    const [circles, setCircles] = useState([]);
    const [arrows, setArrows] = useState([]);
    const [scribbles, setScribbles] = useState([]);
    const [stars, setStars] = useState([]);
    const [textAreas, setTextAreas] = useState([]);
    
    const [text, setText] = useState("Click to resize. Double click to edit.");
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [selected, setSelected] = useState(false);
    
    const [isEditing, setIsEditing] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);

    const [pos, setPos] = useState("relative");
    const [mode, setMode] = useState("video");
    
    const strokeColor = "#000";
    const isPaining = useRef();
    const currentShapeId = useRef();
    const transformerRef = useRef();
    
    
    const isDraggable = action === ACTIONS.SELECT;
    

        //overlay elements state chanege handlers

        const changePos = () => {
            (pos === "relative") ? setPos("absolute translate-y-80") : setPos("relative");
            (mode==="video") ? setMode("overlay") : setMode("video");
        }
    
        useEffect(() => {
        
        
        if (!selected && isEditing) {
            setIsEditing(false);
        } else if (!selected && isTransforming) {
            setIsTransforming(false);
        }
        }, [selected, isEditing, isTransforming]);
    
        function toggleEdit() {
        setIsEditing(!isEditing);
        onTextClick(!isEditing);
        }
    
        function toggleTransforming() {
        setIsTransforming(!isTransforming);
        onTextClick(!isTransforming);
        }
    
        const onTextResize = (newWidth, newHeight) => {
        setWidth(newWidth);
        setHeight(newHeight);
        };
    
        // const onClick = () => {
        //   setSelected(!selected);
        // };
    
        const onTextClick = (newSelected) => {
        setSelected(newSelected);
        };
    
        const onTextChange = (value) => setText(value);

        const handleDragStart = (e) => {
            const id = e.target.id();
            setStars(
                stars.map((star) => {
                return {
                    ...star,
                    isDragging: star.id === id,
                };
            })
            );
        };

        const handleDragEnd = (e) => {
            setStars(
                stars.map((star) => {
                return {
                    ...star,
                    isDragging: false,
                };
            })
            );
        };

        
        function onClick(e) {
            if (action !== ACTIONS.SELECT) return;
            const target = e.currentTarget;
            transformerRef.current.nodes([target]);
            }


        //mouse events

        function onPointerDown() {
        if (action === ACTIONS.SELECT) return;
    
        const stage = stageRef.current;
        const { x, y } = stage.getPointerPosition();
        const id = uuidv4();
    
        currentShapeId.current = id;
        isPaining.current = true;
    
        switch (action) {
            case ACTIONS.RECTANGLE:
            setRectangles((rectangles) => [
                ...rectangles,
                {
                id,
                x,
                y,
                height: 20,
                width: 20,
                fillColor,
                },
            ]);
            break;
            case ACTIONS.CIRCLE:
            setCircles((circles) => [
                ...circles,
                {
                id,
                x,
                y,
                radius: 20,
                fillColor,
                },
            ]);
            break;
    
            case ACTIONS.ARROW:
            setArrows((arrows) => [
                ...arrows,
                {
                id,
                points: [x, y, x + 20, y + 20],
                fillColor,
                },
            ]);
            break;
            case ACTIONS.SCRIBBLE:
            setScribbles((scribbles) => [
                ...scribbles,
                {
                id,
                points: [x, y],
                fillColor,
                },
            ]);
            break;
            case ACTIONS.TEXT:
            
            setTextAreas((texts) => [
                ...texts,
                {
                id,
                x,
                y,
                
                },
            ]);
            break;
        }
        }
    
        // useEffect(() => {
        //   const textArea = textAreaRef.current;
        //   if (action === "writing") {
        //     setTimeout(() => {
        //       textArea.focus();
        //       textArea.value = selectedElement.text;
        //     }, 0);
        //   }
        // }, [ACTIONS.TEXT, currentShapeId.current]);



        function onPointerMove() {
        if (action === ACTIONS.SELECT || !isPaining.current) return;
    
        const stage = stageRef.current;
        const { x, y } = stage.getPointerPosition();
    
        switch (action) {
            case ACTIONS.RECTANGLE:
            setRectangles((rectangles) =>
                rectangles.map((rectangle) => {
                if (rectangle.id === currentShapeId.current) {
                    return {
                    ...rectangle,
                    width: x - rectangle.x,
                    height: y - rectangle.y,
                    };
                }
                return rectangle;
                })
            );
            break;
            case ACTIONS.CIRCLE:
            setCircles((circles) =>
                circles.map((circle) => {
                if (circle.id === currentShapeId.current) {
                    return {
                    ...circle,
                    radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
                    };
                }
                return circle;
                })
            );
            break;
            case ACTIONS.ARROW:
            setArrows((arrows) =>
                arrows.map((arrow) => {
                if (arrow.id === currentShapeId.current) {
                    return {
                    ...arrow,
                    points: [arrow.points[0], arrow.points[1], x, y],
                    };
                }
                return arrow;
                })
            );
            break;
            case ACTIONS.SCRIBBLE:
            setScribbles((scribbles) =>
                scribbles.map((scribble) => {
                if (scribble.id === currentShapeId.current) {
                    return {
                    ...scribble,
                    points: [...scribble.points, x, y],
                    };
                }
                return scribble;
                })
            );
            break;
            case ACTIONS.TEXT:
                setTextAreas((texts) =>
                texts.map((text) => {
                    if (text.id === currentShapeId.current) {
                    return {
                        ...text,
                        width: x - text.x,
                        height: y - text.y,
                    };
                    }
                    return text;
                })
                );
                break;
        }
        }
    
        function onPointerUp() {
    
        isPaining.current = false;
        }


        //API calls
    
        async function handleSave() {
        let stageJson = stageRef.current.toJSON();

        let textVal ;

        if(!textAreas[0]){
            textVal = null
        }else{
            textVal = {
                id:textAreas[0].id,
                x:textAreas[0].x,
                y:textAreas[0].y,
                color:fillColor,
                text:text,
                width:width,
                height:height
            }
        }
        //let rectJson = rect.toJSON();
        console.log("stage", stageJson);
        console.log("rect", rectangles);
        console.log("circle", circles);
        console.log("arrow", arrows);
        console.log("scribble", scribbles);
        console.log("star", stars);
        console.log("text", textAreas);
            
    
        let data = {
            _id: userData.user.overlay,
            overlay:{
                rect: rectangles,
                circle: circles,
                arrow: arrows,
                scribble: scribbles,
                star: stars,
                text: textVal
            }
            
        }
        
        try{
            const response = await axiosAPI.post('/users/update-overlay', data)
            console.log(response.data);
            
            //if(response.data.data) dispatch(authLogin(response.data.data));
            
            
            
        }catch(err){
            console.log(err.response.data);
            
        }
    }
        async function handleLoad() {
            console.log(stageRef.current);
            let stageJson = stageRef.current.toJSON();
            console.log("stageJson", stageJson);
            

            // stageRef.current = currentStage;
            

            // Konva.Stage.create(currentStage);

            console.log(stageJson);

            let data = {
                _id: userData.user.overlay,
                
            }
    
    
        
    
        try{
            const response = await axiosAPI.post('/users/overlay', data)
            console.log(response.data);
            console.log("rect :",response.data.data.rect);
            console.log("circle :",response.data.data.circle);
            console.log("arrow :",response.data.data.arrow);
            console.log("scribble :",response.data.data.scribble);

            setRectangles(response.data.data.rect)
            setCircles(response.data.data.circle)
            setArrows(response.data.data.arrow)
            setScribbles(response.data.data.scribble)
            setStars(response.data.data.star)
            setTextAreas(prev=>[...prev, response.data.data.text])
            setWidth(response.data.data.text.width)
            setHeight(response.data.data.text.height)
            setFillColor(response.data.data.text.color)
            setText(response.data.data.text.text)

            Konva.Rect.create(response.data.data.rect);
            Konva.Circle.create(response.data.data.circle);
            Konva.Arrow.create(response.data.data.arrow);
            Konva.Scribble.create(response.data.data.scribble);
            Konva.Star.create(response.data.data.star);
            Konva.Text.create(response.data.data.text);
            
            //if(response.data.data) dispatch(authLogin(response.data.data));
            
            
            
        }catch(err){
            console.log(err.response.data);
            
        }
    
        }
    
        function handleClear() {
        
        setRectangles([]);
        setCircles([]);
        setArrows([]);
        setScribbles([]);
        setTextAreas([]);
        setStars([]);
    
        }
    
        function handleExport() {
    
        const uri = stageRef.current.toDataURL();
        var link = document.createElement("a");
        link.download = "image.png";
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        }
    
        
    


    
        return (
        <>
            <div className=" relative w-full h-screen overflow-hidden">
            
            {/* Controls */}
            <div className="absolute bg-blue-200 -bottom-0 z-10 w-full py-2 ">
                <div className="flex justify-center z-20 items-center gap-3 py-2 px-3 w-fit mx-auto border-4 shadow-lg rounded-lg border-teal-500 border-solid bg-white">
                <button
                    className={
                    action === ACTIONS.SELECT
                        ? "bg-violet-300 p-1 rounded"
                        : "p-1 hover:bg-violet-100 rounded"
                    }
                    onClick={() => setAction(ACTIONS.SELECT)}
                >
                    <GiArrowCursor size={"2rem"} />
                </button>
                <button
                    className={
                    action === ACTIONS.RECTANGLE
                        ? "bg-violet-300 p-1 rounded"
                        : "p-1 hover:bg-violet-100 rounded"
                    }
                    onClick={() => setAction(ACTIONS.RECTANGLE)}
                >
                    <TbRectangle size={"2rem"} />
                </button>
                <button
                    className={
                    action === ACTIONS.CIRCLE
                        ? "bg-violet-300 p-1 rounded"
                        : "p-1 hover:bg-violet-100 rounded"
                    }
                    onClick={() => setAction(ACTIONS.CIRCLE)}
                >
                    <FaRegCircle size={"1.5rem"} />
                </button>
                <button
                    className={
                    action === ACTIONS.STAR
                        ? "bg-violet-300 p-1 rounded"
                        : "p-1 hover:bg-violet-100 rounded"
                    }
                    onClick={() => setStars(INITIAL_STATE)}
                >
                    <FaStar size={"1.5rem"} />
                </button>
                <button
                    className={
                    action === ACTIONS.ARROW
                        ? "bg-violet-300 p-1 rounded"
                        : "p-1 hover:bg-violet-100 rounded"
                    }
                    onClick={() => setAction(ACTIONS.ARROW)}
                >
                    <FaLongArrowAltRight size={"2rem"} />
                </button>
                <button
                    className={
                    action === ACTIONS.SCRIBBLE
                        ? "bg-violet-300 p-1 rounded"
                        : "p-1 hover:bg-violet-100 rounded"
                    }
                    onClick={() => setAction(ACTIONS.SCRIBBLE)}
                >
                    <LuPencil size={"1.5rem"} />
                </button>
    
                <button
                    className={
                    action === ACTIONS.TEXT
                        ? "bg-violet-300 p-1 rounded"
                        : "p-1 hover:bg-violet-100 rounded"
                    }
                    onClick={() => setAction(ACTIONS.TEXT)}
                >
                    <IoText size={"1.5rem"} />
                </button>
    
                <button>
                    <input
                    className="w-6 h-6"
                    type="color"
                    value={fillColor}
                    onChange={(e) => setFillColor(e.target.value)}
                    />
                </button>
    
                <button onClick={handleExport}>
                    <IoMdDownload size={"1.5rem"} />
                </button>
    
                <button onClick={handleSave}>
                    <IoMdCloudUpload size={"1.5rem"} />
                </button>
    
                    <button onClick={handleClear}>
                    <IoTrashBinOutline size={"1.5rem"} />
                </button>
    
                <button onClick={handleLoad}>
                    <BiLoaderCircle size={"1.5rem"} />
                </button>
                <button onClick={changePos}>
                    <BiEdit size={"1.5rem"} />
                </button>
                </div>
            </div>
            {/* Canvas */}

            <div id="video-player" className="-z-10 bg-transparent flex flex-col justify-center items-center">

            {/* Embedded rtsp video link change it to your own */}
            <iframe className={`-translate-y-160 ${pos } `} width="640" height="480" src="https://rtsp.me/embed/arAnAy9y/" allow="fullscreen" frameborder="0" onVolumeChange={e => console.log(e)}>
            </iframe>


            <p>powered by
            <a href="https://rtsp.me" title ='RTSP.ME - Free website RTSP video steaming service' target="_blank" >rtsp.me
            </a>
            </p>
            <h1>{`${mode}`}</h1>
            </div>
            <Stage id = "canvas" className="bg-transparent"
                ref={stageRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
            >
                <Layer className="bg-transparent">
                <Rect
                    x={0}
                    y={0}
                    height={window.innerHeight}
                    width={window.innerWidth}
                    fill="transparent"
                    id="bg"
                    onClick={() => {
                    transformerRef.current.nodes([]);
                    }}
                />
    
                {rectangles.map((rectangle) => (
                    <Rect
                    key={rectangle.id}
                    x={rectangle.x}
                    y={rectangle.y}
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={rectangle.fillColor}
                    height={rectangle.height}
                    width={rectangle.width}
                    draggable={isDraggable}
                    onClick={onClick}
                    />
                ))}
    
                {circles.map((circle) => (
                    <Circle
                    key={circle.id}
                    radius={circle.radius}
                    x={circle.x}
                    y={circle.y}
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={circle.fillColor}
                    draggable={isDraggable}
                    onClick={onClick}
                    />
                ))}
                {arrows.map((arrow) => (
                    <Arrow
                    key={arrow.id}
                    points={arrow.points}
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={arrow.fillColor}
                    draggable={isDraggable}
                    onClick={onClick}
                    />
                ))}
    
                {scribbles.map((scribble) => (
                    <Line
                    key={scribble.id}
                    lineCap="round"
                    lineJoin="round"
                    points={scribble.points}
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={scribble.fillColor}
                    draggable={isDraggable}
                    onClick={onClick}
                    />
                ))}
                {(stars) && stars.map((star) => (
                <Star
                    key={star.id}
                    id={star.id}
                    x={star.x}
                    y={star.y}
                    numPoints={5}
                    innerRadius={20}
                    outerRadius={40}
                    fill="#89b717"
                    opacity={0.8}
                    draggable
                    rotation={star.rotation}
                    shadowColor="black"
                    shadowBlur={10}
                    shadowOpacity={0.6}
                    shadowOffsetX={star.isDragging ? 10 : 5}
                    shadowOffsetY={star.isDragging ? 10 : 5}
                    scaleX={star.isDragging ? 1.2 : 1}
                    scaleY={star.isDragging ? 1.2 : 1}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
            />
        ))}
                {(textAreas[0]) && textAreas.map((textArea) => (
                    <EditableText
                    key={textArea.id}
                    x={textArea.x}
                    y={textArea.y}
                    text={text}
                    width={width}
                    color={fillColor}
                    height={height}
                    onResize={onTextResize}
                    onClick={onClick}
                    isEditing={isEditing}
                    isTransforming={isTransforming}
                    onToggleEdit={toggleEdit}
                    onToggleTransform={toggleTransforming}
                    onChange={onTextChange}
                    />
                ))}
    
    
                
                {/* {ACTIONS.TEXT === action && <StickyNote
                    x={50}
                    y={50}
                    text={text}
                    colour="#FFDAE1"
                    onTextChange={(value) => setText(value)}
                    width={width}
                    height={height}
                    selected={selected}
                    draggable={isDraggable}
                    onTextResize={(newWidth, newHeight) => {
                    setWidth(newWidth);
                    setHeight(newHeight);
                    }}
                    onClick={() => {
                    setSelected(!selected);
                    }}
                    onTextClick={(newSelected) => {
                    setSelected(newSelected);
                    }
                    
                }
            />} */}
                
    
                {/* {action === "writing" ? (
                <textarea
                    ref={textAreaRef}
                    
                    style={{
                    position: "fixed",
                    top: y,
                    left: x,
                    font: "24px sans-serif",
                    margin: 0,
                    padding: 0,
                    border: 0,
                    outline: 0,
                    resize: "auto",
                    overflow: "hidden",
                    whiteSpace: "pre",
                    background: "transparent",
                    zIndex: 2,
                    }}
                />
                ) : null} */}
    
                <Transformer ref={transformerRef} />
                </Layer>
            </Stage>
            </div>
        </>
        );
}

export default Overlay;