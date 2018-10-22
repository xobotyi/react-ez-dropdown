import React     from "react";
import Scrollbar from "react-scrollbars-custom";
import Body      from "./Body";
import Footer    from "./Footer";
import Head      from "./Head";

const authorName = "Anton Zinovyev";
const authorLink = "https://github.com/xobotyi";
const packageLink = "https://github.com/xobotyi/react-ez-dropdown";
const packageName = "react-ez-dropdown";

export default class App extends React.Component
{
    render() {
        return <Scrollbar defaultStyles={ false } contentClassName="AppContent">
            <Head packageName={ packageName } packageLink={ packageLink } />
            { window.location.hash !== '#benchmark' && <Body packageName={ packageName } packageLink={ packageLink } /> }
            <Footer authorName={ authorName } authorLink={ authorLink } packageName={ packageName } packageLink={ packageLink } />
        </Scrollbar>;
    }
}
