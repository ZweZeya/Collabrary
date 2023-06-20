import { type ButtonProps } from "@/common/utils/propsInterfaces"

const Button = (props: ButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            className={`rounded-md border border-black px-2 py1 font-medium ${props.className} `}
            style={props.style}
        >
            {props.children}
        </button>
    )
}

export default Button