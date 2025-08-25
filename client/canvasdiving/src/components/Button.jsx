import '../assets/styles/Button.css'

function Button({ buttonText, onClick }){

    return (
        <button className="Button" onClick={onClick}>
            {buttonText}
        </button>
    )

}

export default Button