import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as auth_actions from "./../Redux/actions/auth_actions";
import LoginForm from "../Forms/LoginForm";
import Loading from "../components/Loading";
import { withStyles, withTheme } from "@material-ui/core";

const styles = theme => ({});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      user: "guest",
      id: 0
    };
  }

  componentDidMount() {
    console.log("did mount login");
  }

  login = values => {
    const { actions } = this.props;
    this.setState({
      remember: values.remember
    });
    actions.login(values.email, values.password);
  };
  render() {
    const { is_authenticated, history, is_loading, user, id } = this.props;
    console.log("state", this.state);

    if (is_authenticated) {
      if (this.state.remember) {
        localStorage.setItem("user", user);
        localStorage.setItem("id", id);
        sessionStorage.setItem("user", user);
        sessionStorage.setItem("id", id);
      } else {
        sessionStorage.setItem("user", user);
        sessionStorage.setItem("id", id);
      }
      console.log("did push");
      history.push("/");
    }
    return (
      <div>
        <LoginForm onSubmit={this.login} />
        <Loading open={is_loading} />
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    is_authenticated: store.auth_reducer.is_authenticated,
    is_loading: store.auth_reducer.is_loading,
    user: store.auth_reducer.user,
    id: store.auth_reducer.id
  };
};
const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(auth_actions, dispatch) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTheme(LoginPage)));
