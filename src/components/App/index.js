import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import LoginPage from "../../Pages/LoginPage";
import MosaicPage from "../../Pages/MosaicPage";
import ProjectsPage from "../../Pages/ProjectsPage";
import EditorPage from "../../Pages/EditorPage";
import { connect } from "react-redux";
import * as auth_actions from "./../../Redux/actions/auth_actions";
import { bindActionCreators } from "redux";

class App extends Component {
  componentDidMount() {
    const { actions } = this.props;
    console.log("did app");
    actions.is_sessionActive();
  }
  render() {
    // zip.workerScriptsPath = "/lib/";
    let SecureRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.is_authenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <SecureRoute exact path="/" component={ProjectsPage} />
          <SecureRoute path="/mosaics/:project" component={MosaicPage} />
          <SecureRoute path="/editor/:id" component={EditorPage} />
        </Switch>
      </Router>
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
