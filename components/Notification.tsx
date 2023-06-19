import { Fragment, PropsWithChildren } from "react";
import { type ModalProps } from "@/common/utils/propsInterfaces";
import { AiOutlineClose } from "react-icons/ai";

interface NotificationProps extends ModalProps, PropsWithChildren {}

const Notification = (props: NotificationProps) => {

    const handleCloseNotification = () => {
        props.setOpen(false);
        if (props.onRequestClose) {
            props.onRequestClose();
        }
    }

    return (
        <Fragment>
            {props.isOpen &&
                <div 
                    className="rounded-md bg-sky-200 text-sm absolute right-9 w-64 h-14 px-1 flex items-center"
                >
                    <div className="flex items-center px-1 py-1">
                        {props.children}
                    </div>
                    <div 
                        className="ml-auto border-l border-l-4 border-black h-full flex items-center justify-center w-9 cursor-pointer"
                        onClick={handleCloseNotification}
                    >
                        <AiOutlineClose size={15} />
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Notification