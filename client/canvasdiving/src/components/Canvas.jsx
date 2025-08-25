import { useRef, useEffect, useState } from "react";
import '../assets/styles/Canvas.css';
import { CANVAS_CONFIG, handleCanvasInteraction, clearCanvas, toggleGuide } from '../utils/canvasUtils.js';
import { useCanvas } from '../context/canvasContext.jsx';

function Canvas() {
    const canvas = useRef(null);
    const guide = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const { state } = useCanvas();
    const colorHistory = {};

    useEffect(() => {
        handleCanvasInteraction('init', { canvas: canvas.current, guide: guide.current });
    }, []);

    const onMouseEvent = (e, type) => {
        if (type === 'down' && e.button !== 0) return;
        
        const shouldDraw = type === 'down' || (type === 'move' && isDrawing);
        if (type === 'down') setIsDrawing(true);
        if (type === 'up' || type === 'leave') setIsDrawing(false);
        
        if (shouldDraw) {
            handleCanvasInteraction('draw', {
                canvas: canvas.current,
                event: e,
                color: state.currentColor,
                colorHistory,
                colorPicker: null
            });
        }
    };

    return (
        <>
            <div className="canvas">
                <div id="guide" ref={guide} style={{ width: CANVAS_CONFIG.CANVAS_SIZE, height: CANVAS_CONFIG.CANVAS_SIZE }} />
                <canvas 
                    width={CANVAS_CONFIG.CANVAS_SIZE}
                    height={CANVAS_CONFIG.CANVAS_SIZE}
                    id="canvas" 
                    ref={canvas} 
                    onMouseDown={(e) => onMouseEvent(e, 'down')}
                    onMouseMove={(e) => onMouseEvent(e, 'move')}
                    onMouseUp={(e) => onMouseEvent(e, 'up')}
                    onMouseLeave={(e) => onMouseEvent(e, 'leave')}
                />
            </div>
        </>
    );
}

export default Canvas;