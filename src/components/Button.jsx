import "../css/Button.css";

function Button({ type = "button", text, disabled, onClick}) {
    return (
        <div className="button-container">
            <button
                className="button"
                type={type}
                disabled={disabled}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}

export default Button;
