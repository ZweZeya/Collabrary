import { Fragment, PropsWithChildren } from "react";
import Main from "./Main";
import TopBar from "./TopBar";


const Layout = (props: PropsWithChildren) => {
    return (
        <Fragment>
            <TopBar />
            <Main>
                { props.children }
            </Main>
        </Fragment>
    )
}

export default Layout;