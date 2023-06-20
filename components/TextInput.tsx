import { type InputProps } from "@/common/utils/propsInterfaces";
import { Fragment } from "react";

interface TextInputProps extends InputProps {
    label: string,
};

const TextInput = (props: TextInputProps) => {
    return (
        <div className="flex flex-col">
            <label className="font-medium">{props.label}</label>
            <input 
                className="border border-black rounded-md h-8 w-80 px-2 bg-sky-50"
                type="text" 
                placeholder={props.placeHolder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default TextInput;