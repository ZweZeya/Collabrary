interface ModalProps {
    isOpen: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    className?: string,
    onRequestClose?: Function
}

export { ModalProps };