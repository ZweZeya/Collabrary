import { Fragment, PropsWithChildren } from "react";
import Main from "./Main";
import TopBar from "./TopBar";
import Content from "./Content";


const Layout = (props: PropsWithChildren) => {
    return (
        <Fragment>
            <Main>
                <TopBar />
                <Content>
                    { props.children }
                </Content>
            </Main>
        </Fragment>
    )
}

export default Layout;