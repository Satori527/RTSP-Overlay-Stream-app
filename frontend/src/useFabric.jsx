// import * as fabric from 'fabric'; // v6
// import React, { useEffect, useRef } from 'react';

// export const FabricJSCanvas = () => {
//     const canvasEl = useRef<HTMLCanvasElement>(null);
//     useEffect(() => {
//         const options = {
//             height: 800,
//             width: 800,
//             backgroundColor: 'pink'
//         };
//         const canvas = new fabric.Canvas(canvasEl.current, options);
//         // make the fabric.Canvas instance available to your app
//         //updateCanvasContext(canvas);
//             return () => {
//             //updateCanvasContext(null);
//             canvas.dispose();
//             }
//     }, []);

//     return <canvas width="300" height="300" ref={canvasEl}/>;
// };