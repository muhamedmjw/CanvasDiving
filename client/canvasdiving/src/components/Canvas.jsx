import { useRef, useEffect, useState } from "react";
import '../assets/styles/Canvas.css';

function Canvas() {
    
    const canvas = useRef(null);
    const guide = useRef(null);
    const colorPicker = useRef(null);
    const toggleGuide = useRef(null);
    const clearButton = useRef(null);

    const SIZE_COUNT = 16;
    const CANVAS_SIZE = 640; // Use exact size
    const CELL_SIZE = CANVAS_SIZE / SIZE_COUNT; // 32px per cell
    const colorHistory = {};
    
    const [isDrawing, setIsDrawing] = useState(false);

    const getDrawingContext = () => {
        return canvas.current?.getContext("2d");
    };

    useEffect(() => {
        const drawingContext = getDrawingContext();
        if (drawingContext && canvas.current) {
            // Disable smoothing for crisp pixels
            drawingContext.imageSmoothingEnabled = false;
            
            drawingContext.fillStyle = "#ffffff";
            drawingContext.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
    }, []);

    useEffect(() => {
        if (guide.current) {
            guide.current.style.gridTemplateColumns = `repeat(${SIZE_COUNT}, 1fr)`;
            guide.current.style.gridTemplateRows = `repeat(${SIZE_COUNT}, 1fr)`;

            // Clear existing cells
            guide.current.innerHTML = '';

            [...Array(SIZE_COUNT ** 2)].forEach((_, i) => {
                const cell = document.createElement("div");
                cell.dataset.index = i;
                guide.current.appendChild(cell);
            });
        }
    }, []);

    function handleCanvasMouseDown(e){
        if (e.button !== 0) return; // Only respond to left mouse button
        setIsDrawing(true);
        drawAtPosition(e);
    }

    function handleCanvasMouseMove(e){
        if (!isDrawing) return;
        drawAtPosition(e);
    }

    function handleCanvasMouseUp(){
        setIsDrawing(false);
    }

    function drawAtPosition(e) {
        const canvasBoundingRect = canvas.current.getBoundingClientRect();
        const x = e.clientX - canvasBoundingRect.left;
        const y = e.clientY - canvasBoundingRect.top;
        
        // Calculate the scale factors
        const scaleX = CANVAS_SIZE / canvasBoundingRect.width;
        const scaleY = CANVAS_SIZE / canvasBoundingRect.height;
        
        // Adjust coordinates based on scale
        const adjustedX = x * scaleX;
        const adjustedY = y * scaleY;
        
        // Calculate cell coordinates
        const cellX = Math.floor(adjustedX / CELL_SIZE);
        const cellY = Math.floor(adjustedY / CELL_SIZE);
        
        // Ensure we're within bounds
        if (cellX >= 0 && cellX < SIZE_COUNT && cellY >= 0 && cellY < SIZE_COUNT) {
            const currentColor = colorHistory[`${cellX}, ${cellY}`];

            if (e.ctrlKey){
                if (currentColor){
                    colorPicker.current.value = currentColor;
                }
            } else {
                fillCell(cellX, cellY);
            }
        }
    }

    function handleClearButton(){
        const drawingContext = getDrawingContext();
        if (drawingContext) {
            drawingContext.fillStyle = "#ffffff";
            drawingContext.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
            
            // Clear color history
            Object.keys(colorHistory).forEach(key => delete colorHistory[key]);
        }
    }

    function handleToggleGuide(){
        if (guide.current) {
            guide.current.style.display = toggleGuide.current.checked ? "grid" : "none";
        }
    }

    function fillCell(cellX, cellY){
        const drawingContext = getDrawingContext();
        if (drawingContext) {
            const startX = cellX * CELL_SIZE;
            const startY = cellY * CELL_SIZE;

            drawingContext.fillStyle = colorPicker.current.value;
            drawingContext.fillRect(startX, startY, CELL_SIZE, CELL_SIZE);
            colorHistory[`${cellX}, ${cellY}`] = colorPicker.current.value;
        }
    }

    return (
        <>
            <div className="canvas-container">
                <div id="guide" ref={guide} style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}></div>
                <canvas 
                    width={CANVAS_SIZE}
                    height={CANVAS_SIZE}
                    id="canvas" 
                    ref={canvas} 
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={() => setIsDrawing(false)}
                />
            </div>
            <div>
                <label htmlFor="colorPicker">Color: </label>
                <input type="color" id="colorPicker" defaultValue="#000000" ref={colorPicker}/>
            </div>
            <div>
                <label htmlFor="toggleGuide">Toggle Grid: </label>
                <input type="checkbox" id="toggleGuide" defaultChecked ref={toggleGuide} onChange={handleToggleGuide}/>
            </div>
            <div>
                <button type="button" id="clear" ref={clearButton} onClick={handleClearButton}>Clear</button>
            </div>
        </>
    )
}

export default Canvas