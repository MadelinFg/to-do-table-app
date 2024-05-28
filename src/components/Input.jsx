import '../css/Input.css';

function Input({type, title, value, placeholder = "", name, disabled, onChange}) {
    return (
        <div className="input-container">
            <div className="input-title">
                <label htmlFor={name} className='input-label'>{title}</label>
            </div>
            
            <input className='normal-input input-component'
                type={type}
                value={value} 
                name={name} 
                placeholder={placeholder} 
                disabled={disabled}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;