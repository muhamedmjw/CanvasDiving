import Button from "../components/Button";
import Canvas from "../components/Canvas";
import SidePanel from "../components/SidePanel";
import { useCanvasOperations } from "../hooks/useCanvasOperations";

function Home() {
    const { clearCanvas } = useCanvasOperations();

    return (
        <div className="Home">
            <SidePanel/>
            <Canvas className="canvas"/>
            <SidePanel/>
            <Button buttonText="Draw" className="button"/>
            <Button buttonText="Dive" className="button"/>
            {/* Now you can easily add the Clear button here! */}
            <Button 
                buttonText="Clear" 
                className="button" 
                onClick={clearCanvas}
            />
        </div>
    );
}

export default Home;