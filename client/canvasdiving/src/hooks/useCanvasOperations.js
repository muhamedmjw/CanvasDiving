import { useCanvas } from '../context/canvasContext';

export const useCanvasOperations = () => {
  const { state, dispatch } = useCanvas();

  const clearCanvas = () => {
    dispatch({ type: 'CLEAR_CANVAS' });
  };

  const setColor = (color) => {
    dispatch({ type: 'SET_COLOR', payload: color });
  };

  const setCanvasRef = (ref) => {
    dispatch({ type: 'SET_CANVAS_REF', payload: ref });
  };

  return {
    canvasRef: state.canvasRef,
    currentColor: state.currentColor,
    colorHistory: state.colorHistory,
    clearCanvas,
    setColor,
    setCanvasRef,
  };
};