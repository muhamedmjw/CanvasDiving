import "../assets/styles/SidePanel.css";

export default function SidePanel({ className, children }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}
