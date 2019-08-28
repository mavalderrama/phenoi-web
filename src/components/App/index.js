import {initializeIcons} from "office-ui-fabric-react";
import React, {Component, Fragment} from "react";
import {Redirect, Route} from "react-router-dom";
import WelcomePage from "../../Pages/WelcomePage";
import LoginPage from "../../Pages/LoginPage";
import MapPage from "../../Pages/MapPage";
import {bindActionCreators} from "redux";
import * as auth_actions from "../../Redux/actions/auth_actions";
import {connect} from "react-redux";

class App extends Component {
    componentDidMount() {
        
    }
    render() {
        var SecureRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                this.props.is_authenticated
                    ? <Component {...props} /> :  <Redirect to="/login"/>
            )}/>
        );
        return <Fragment>
            <Route path="/login" component={LoginPage} />
            <SecureRoute exact path="/" component={WelcomePage} />
            <SecureRoute path="/map" component={MapPage} />
        </Fragment>

    }
}

const mapStateToProps = (store, ownProps)=>{
    return{
        is_authenticated: store.auth_reducer.is_authenticated
    }
};
export default connect(mapStateToProps)(App)


