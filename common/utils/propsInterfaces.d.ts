import { CSSProperties, ChangeEventHandler, MouseEventHandler, PropsWithChildren } from "react";

interface ModalProps {
    isOpen: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    className?: string,
    onRequestClose?: Function
}

interface InputProps {
    value: string,
    placeHolder?: string,
    onChange: ChangeEventHandler,
    name?: string,
}

interface ButtonProps extends PropsWithChildren {
    onClick: MouseEventHandler
    className?: string,
    style?: CSSProperties,
}

export { ModalProps, InputProps, ButtonProps };