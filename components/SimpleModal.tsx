"use client";
import { Fragment, ReactNode, useCallback } from "react";
import { AiOutlineWarning, AiOutlineCheckCircle, AiOutlineExclamationCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { type ModalProps } from "@/common/utils/propsInterfaces";

interface SimpleModalProps extends ModalProps {
    icon?: SimpleModalIcons,
    content: string,
    title?: string,
}

enum SimpleModalIcons {
    Warning,
    Success,
    Exclaim,
    Failure
}

const SimpleModal = (props: SimpleModalProps) => {

    const generateIcon = useCallback((type?: SimpleModalIcons): ReactNode => {
        if (type == undefined) return <></>;
        switch(type) {
            case 0:
                return <AiOutlineWarning size={80} className="text-yellow-500"/>;
            case 1:
                return <AiOutlineCheckCircle size={80} className="text-green-600" />;
            case 2:
                return <AiOutlineExclamationCircle size={80} className="text-blue-700" />;
            case 3:
                return <AiOutlineCloseCircle size={80} className="text-red-700" />;
            default:
                return <></>;
        }
    }, [])

    const handleModalClose = () => {
        props.setOpen(false);
        if (props.onRequestClose) props.onRequestClose();
    };

    return (
        <Fragment>
            {props.isOpen && <Fragment>
                <div 
                    className="bg-neutral-700 opacity-50 absolute h-screen w-screen top-0 left-0"
                    onClick={handleModalClose}
                ></div>
                <div 
                    className="bg-sky-50 flex flex-col gap-2 items-center absolute top-1/2 left-1/2 py-3 px-5 rounded-md" 
                    style={{ transform: "translate(-50%, -50%)" }}
                >
                    { generateIcon(props.icon) }
                    <p className="text-2xl font-medium">{props.title}</p>
                    <p>{props.content}</p>
                </div>
            </Fragment>} 
        </Fragment>   
    )
}

export { SimpleModalIcons };
export default SimpleModal;