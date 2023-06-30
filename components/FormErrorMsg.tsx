import { Fragment, PropsWithChildren } from "react";
import { type ModalProps } from "@/common/utils/propsInterfaces";

interface FormErrorMsgProps extends ModalProps, PropsWithChildren {};

const FormErrorMsg = (props: FormErrorMsgProps) => {
    return (
        <Fragment>
            {props.isOpen && 
                <p className="text-red-500">
                    { props.children }
                </p>
            }
        </Fragment>
    );
};

export default FormErrorMsg;