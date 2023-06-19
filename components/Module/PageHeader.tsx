import { PropsWithChildren } from "react"

interface PageHeaderProps extends PropsWithChildren {
    title: string
}

const PageHeader = (props: PageHeaderProps) => {
    return (
        <div className="flex items-center gap-5 mb-4">
            <p className="text-4xl">
                {props.title}
            </p>
            {props.children}
        </div>
    )
}

export default PageHeader;