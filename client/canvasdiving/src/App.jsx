import './assets/styles/App.css'
import Home from './pages/Home'

function App() {

    return (
    <>  
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
            
    </>
    )
}

export default App
