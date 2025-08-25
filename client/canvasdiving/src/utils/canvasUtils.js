// Canvas utility functions
export const CANVAS_CONFIG = {
    SIZE_COUNT: 16,
    CANVAS_SIZE: 640,
    get CELL_SIZE() {
        return this.CANVAS_SIZE / this.SIZE_COUNT;
    }
};

export const handleCanvasInteraction = (action, params) => {
    switch (action) {
        case 'init':
            initializeCanvas(params.canvas);
            initializeGuide(params.guide);
            break;
        case 'draw':
            const { cellX, cellY } = calculateCellPosition(params.event, params.canvas);
            if (isWithinBounds(cellX, cellY)) {
                if (params.event.ctrlKey) {
                    pickColor(params.colorHistory, cellX, cellY, params.colorPicker);
                } else {
                    fillCell(params.canvas, cellX, cellY, params.color, params.colorHistory);
                }
            }
            break;
    }
};

const initializeCanvas = (canvas) => {
    const ctx = canvas?.getContext("2d");
    if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, CANVAS_CONFIG.CANVAS_SIZE, CANVAS_CONFIG.CANVAS_SIZE);
    }
};

const initializeGuide = (guide) => {
    if (!guide) return;
    guide.style.gridTemplateColumns = `repeat(${CANVAS_CONFIG.SIZE_COUNT}, 1fr)`;
    guide.style.gridTemplateRows = `repeat(${CANVAS_CONFIG.SIZE_COUNT}, 1fr)`;
    guide.innerHTML = '';
    [...Array(CANVAS_CONFIG.SIZE_COUNT ** 2)].forEach((_, i) => {
        const cell = document.createElement("div");
        cell.dataset.index = i;
        guide.appendChild(cell);
    });
};

const calculateCellPosition = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_CONFIG.CANVAS_SIZE / rect.width;
    const scaleY = CANVAS_CONFIG.CANVAS_SIZE / rect.height;
    const adjustedX = (e.clientX - rect.left) * scaleX;
    const adjustedY = (e.clientY - rect.top) * scaleY;
    return {
        cellX: Math.floor(adjustedX / CANVAS_CONFIG.CELL_SIZE),
        cellY: Math.floor(adjustedY / CANVAS_CONFIG.CELL_SIZE)
    };
};

const isWithinBounds = (cellX, cellY) => {
    return cellX >= 0 && cellX < CANVAS_CONFIG.SIZE_COUNT && 
           cellY >= 0 && cellY < CANVAS_CONFIG.SIZE_COUNT;
};

const fillCell = (canvas, cellX, cellY, color, colorHistory) => {
    const ctx = canvas?.getContext("2d");
    if (ctx) {
        const startX = cellX * CANVAS_CONFIG.CELL_SIZE;
        const startY = cellY * CANVAS_CONFIG.CELL_SIZE;
        ctx.fillStyle = color;
        ctx.fillRect(startX, startY, CANVAS_CONFIG.CELL_SIZE, CANVAS_CONFIG.CELL_SIZE);
        colorHistory[`${cellX}, ${cellY}`] = color;
    }
};

const pickColor = (colorHistory, cellX, cellY, colorPicker) => {
    const currentColor = colorHistory[`${cellX}, ${cellY}`];
    if (currentColor && colorPicker) {
        colorPicker.value = currentColor;
    }
};

export const clearCanvas = (canvas, colorHistory) => {
    const ctx = canvas?.getContext("2d");
    if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, CANVAS_CONFIG.CANVAS_SIZE, CANVAS_CONFIG.CANVAS_SIZE);
        Object.keys(colorHistory).forEach(key => delete colorHistory[key]);
    }
};

export const toggleGuide = (guide, isVisible) => {
    if (guide) guide.style.display = isVisible ? "grid" : "none";
};