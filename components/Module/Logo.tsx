interface RectProps {
    x?: number,
    transform?: string
}

const Logo = () => {
    return (
        <svg height={50} width={66}>
            <Rect />
            <Rect x={20} />
            <Rect x={52} transform="rotate(-15, 52, 60)" />
        </svg>
    )
}

const Rect = (props: RectProps) => {
    return (
        <rect 
            width={8} 
            height={50}
            style={{
                fill: "rgb(239 246 255)",
                strokeWidth: 3
            }} 
            x={props.x}
            transform={props.transform}
            ry="3%"
        />
    )
}

export default Logo;