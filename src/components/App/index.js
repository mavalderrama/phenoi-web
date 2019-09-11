import React, { Component, Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import WelcomePage from "../../Pages/WelcomePage";
import LoginPage from "../../Pages/LoginPage";
import MainPage from "../../Pages/MainPage";
import MosaicPage from "../../Pages/MosaicPage";
import { connect } from "react-redux";
import * as auth_actions from "./../../Redux/actions/auth_actions";
import { bindActionCreators } from "redux";

class App extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.is_sessionActive();
  }
  render() {
    var SecureRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.is_authenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
    return (
      <Fragment>
        <Route path="/login" component={LoginPage} />
        <SecureRoute exact path="/" component={WelcomePage} />
        <SecureRoute path="/main" component={MainPage} />
        <SecureRoute path="/mosaic/:id" component={MosaicPage} />
      </Fragment>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    is_authenticated: store.auth_reducer.is_authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(auth_actions, dispatch) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
