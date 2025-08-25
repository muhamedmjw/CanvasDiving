import React, { createContext, useContext, useReducer } from 'react';
import { clearCanvas } from '../utils/canvasUtils';

const CanvasContext = createContext();

const canvasReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CANVAS_REF':
      return { ...state, canvasRef: action.payload };
    case 'SET_COLOR':
      return { ...state, currentColor: action.payload };
    case 'CLEAR_CANVAS':
      if (state.canvasRef && state.colorHistory) {
        clearCanvas(state.canvasRef, state.colorHistory);
      }
      return { ...state, colorHistory: {} };
    default:
      return state;
  }
};

export const CanvasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(canvasReducer, {
    canvasRef: null,
    currentColor: '#000000',
    colorHistory: {},
  });

  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within CanvasProvider');
  }
  return context;
};