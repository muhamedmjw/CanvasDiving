import Button from "../components/Button";
import Canvas from "../components/Canvas";
import SidePanel from "../components/SidePanel";

function Home() {

    return (
        <>
            <div className="Home">

                <SidePanel/>
                <Canvas className="canvas"/>
                <SidePanel/>
                <Button buttonText="Draw" className="button"/>
                <Button buttonText="Dive" className="button"/>

            </div>
        </>  
    );
}

export default Home