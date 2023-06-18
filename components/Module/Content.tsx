import { PropsWithChildren } from "react";

const Content = (props: PropsWithChildren) => {
    return (
        <div className="px-8 py-5 text-black">
            {props.children}
        </div>
    )
}

export default Content;