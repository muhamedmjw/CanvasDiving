import './assets/styles/App.css'
import Home from './pages/Home'
import { CanvasProvider } from './context/canvasContext'

function App() {
    
    return (
        <CanvasProvider>
            <>
                
                    <div className="header">
                        <h1>Canvas Diving</h1>
                    </div>
                    
                    <div className="main">
                        <Home />
                    </div>

                    <div className="footer">
                        <a href="/">Home</a> · <a href="/about">About</a> · <a href="/legal">Legal</a>
                    </div>

            </>    
        </CanvasProvider>
    );
};

export default App;