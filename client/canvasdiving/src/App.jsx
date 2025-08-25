import './assets/styles/App.css'
import Home from './pages/Home'
import { CanvasProvider } from './context/canvasContext'

function App() {
    
    return (
        <CanvasProvider>
            <div className="parent">
                <h1>Canvas Diving</h1>
                <div className="home-container">
                    <Home />
                </div>
                <footer>
                    <div className="nav-footer">
                        <a href="/">Home</a> · <a href="/about">About</a> · <a href="/legal">Legal</a>
                    </div>
                </footer>
            </div>
        </CanvasProvider>
    )
}

export default App;