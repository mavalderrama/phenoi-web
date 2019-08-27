import {initializeIcons} from "office-ui-fabric-react";
import React, {Component, Fragment} from "react";
import {Redirect, Route} from "react-router-dom";
import WelcomePage from "../../Pages/WelcomePage";
import LoginPage from "../../Pages/LoginPage";
import MapPage from "../../Pages/MapPage";
initializeIcons();

export default class App extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        var SecureRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                this.props.isAutenticated
                    ? <Component {...props} /> :  <Redirect to="/login"/>
            )}/>
        );
        return <Fragment>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/map" component={MapPage} />
        </Fragment>

    }
}


