import Button from "./Button";
import Canvas from "./Canvas";

function HomeMenu() {
    return (
        <div className="HomeMenu">

            <Canvas />

            <Button buttonText="Draw" />
            <Button buttonText="Dive" />
        </div>
    );
}

export default HomeMenu