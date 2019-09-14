import React, { Component, Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
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
        <SecureRoute path="/mosaics" component={MosaicPage} />
        <SecureRoute exact path="/"  component={ProjectsPage} />
        <SecureRoute path="/editor/:id" component={EditorPage} />
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
