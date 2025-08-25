import Button from "../components/Button";
import Canvas from "../components/Canvas";
import SidePanel from "../components/SidePanel";
import CanvasControls from "../components/CanvasControls";
import { useCanvasOperations } from "../hooks/useCanvasOperations";

function Home() {
    const { clearCanvas } = useCanvasOperations();

    return (
        <div className="Home">
            <SidePanel position="left">
                Additional tools
            </SidePanel>
            
            <Canvas className="canvas"/>
            
            <SidePanel position="right">
                <CanvasControls />
            </SidePanel>
            
            <div className="button-container">
                <Button buttonText="Draw" className="button"/>
                <Button buttonText="Dive" className="button"/>
            </div>
            
        </div>
    );
}

export default Home;