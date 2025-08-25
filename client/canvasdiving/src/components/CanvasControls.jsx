import { useRef } from "react";
import { toggleGuide } from '../utils/canvasUtils.js';
import { useCanvas } from '../context/canvasContext.jsx';
import Button from "./Button.jsx";
import { clearCanvas } from '../utils/canvasUtils.js';
import '../assets/styles/CanvasControls.css';

function CanvasControls() {
    const colorPickerRef = useRef(null);
    const toggleGuideRef = useRef(null);
    const { state, dispatch } = useCanvas();

    const handleColorChange = (e) => {
        dispatch({ type: 'SET_COLOR', payload: e.target.value });
    };

    const handleToggleGuide = (e) => {
        const guideElement = document.getElementById('guide');
        if (guideElement) {
            toggleGuide(guideElement, e.target.checked);
        }
    };

    const handleClearCanvas = () => {
        const canvasElement = document.getElementById('canvas');
        if (canvasElement) {
            clearCanvas(canvasElement, {});
        }
    };

    return (
        <div className="canvas-controls">
            <h3>Canvas Controls</h3>
            
            <div className="control-group">
                <label htmlFor="colorPicker">Color: </label>
                <input 
                    type="color" 
                    id="colorPicker" 
                    defaultValue="#000000" 
                    ref={colorPickerRef}
                    onChange={handleColorChange}
                />
            </div>

            <div className="control-group">
                <label htmlFor="toggleGuide">Toggle Grid: </label>
                <input 
                    type="checkbox" 
                    id="toggleGuide" 
                    defaultChecked 
                    ref={toggleGuideRef} 
                    onChange={handleToggleGuide}
                />
            </div>

            <div className="control-group">
                <Button 
                    buttonText="Clear" 
                    className="button" 
                    onClick={handleClearCanvas} 
                />
            </div>
        </div>
    );
}

export default CanvasControls;