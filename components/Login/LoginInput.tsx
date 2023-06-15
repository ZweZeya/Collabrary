import "./LoginInput.css";

interface LoginInputProps {
    icon: React.ReactNode
}

const LoginInput = (props: LoginInputProps) => {
    return (
        <div className="input-container">
            {props.icon}
            <input className="input" type="text" />
        </div>
    )
}

export default LoginInput;