import Button from "../components/Button";
import Canvas from "../components/Canvas";
import SidePanel from "../components/SidePanel";
import ColorPicker from "../components/ColorPicker";
import { useCanvasOperations } from "../hooks/useCanvasOperations";
import "../assets/styles/Home.css";

function Home() {
    const { clearCanvas, setColor } = useCanvasOperations();

    return (
        <div className="main-container">

            <SidePanel className="side-panel-left">
            </SidePanel>

            
            <Canvas className="canvas"/>
            

            <SidePanel className="side-panel-right"> 
                <Button 
                    buttonText="Clear"  
                    className="Button" 
                    onClick={clearCanvas}
                /> 

                <ColorPicker setColor={setColor} />

                

            </SidePanel>

            <div className="button-container">
                <Button buttonText="Draw" className="button-draw"/>
                <Button buttonText="Dive" className="button-dive"/>
            </div>

        </div>
    );
}

export default Home;