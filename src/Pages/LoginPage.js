import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as auth_actions from "./../Redux/actions/auth_actions";
import LoginForm from "../Forms/LoginForm";

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }
  login = values => {
    // console.log(this.props);
    const { actions } = this.props;
    actions.login(values.email, values.password);
  };
  render() {
    const { is_authenticated, history } = this.props;
    if (is_authenticated) {
      history.push("/project");
    }
    return <LoginForm onSubmit={this.login} />;
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    is_authenticated: store.auth_reducer.is_authenticated,
    is_loading: store.auth_reducer.is_loading
  };
};
const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(auth_actions, dispatch) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
