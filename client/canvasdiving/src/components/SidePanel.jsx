import "../assets/styles/SidePanel.css";

export default function SidePanel({ children, position = "left" }) {
    return (
        <div className={`side-panel-${position}`}>
            {children}
        </div>
    );
}