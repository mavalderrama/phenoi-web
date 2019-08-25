import React, { Component } from "react";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import SideNav, { NavItem } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import windowSize from "react-window-size";
import { instanceOf } from "prop-types";

import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PrimaryButton, Stack, TextField } from "office-ui-fabric-react";
import Constants from "./Constants";
import axios from "axios";
import { withCookies, Cookies } from "react-cookie";

initializeIcons();

const iconClass = mergeStyles({
  fontSize: 20,
  height: 20,
  width: 20,
  margin: "0 25px"
});

const IconTest = () => <Icon iconName="HomeSolid" className={iconClass} />;

class App extends Component {
  // static propTypes = {
  //   cookies: instanceOf(Cookies).isRequired
  // };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      logged: false,
      email: "",
      password: "",
      navbar_disabled: true,
      login_disabled: false
    };

    this.tools = {};
  }

  async componentDidMount() {
    const uri = `${Constants.API_BASE_URI}/`;
    const axiosConfig = {
      headers: {
        "content-Type": "application/json",
        Accept: "/"
      },
      withCredentials: true
    };

    const postData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log();
    let response = await axios.post(uri, { void: 0 }, axiosConfig);
    this.setState({
      logged: response.data.logged,
      login_disabled: true,
      navbar_disabled: false
    });
    console.log("response", response.data);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    // console.log(event.target);
    if (event.target.id === "password_id") {
      this.setState({
        password: event.target.value
      });
    } else if (event.target.id === "email_id") {
      this.setState({
        email: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  loginAction = async () => {
    const uri = `${Constants.API_BASE_URI}/login`;
    // const { cookies } = this.props;
    // var uuid4 = require("uuid4");
    // var session = uuid4();
    // cookies.set("session", session);
    const axiosConfig = {
      headers: {
        "content-Type": "application/json",
        Accept: "*/*"
      },
      withCredentials: true
    };
    const postData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(postData);
    let response = await axios.post(uri, postData, axiosConfig);
    console.log("response", response);
    let message = response.data.message;
    if (message === "user login success") {
      this.setState({
        login: true,
        navbar_disabled: false,
        login_disabled: true
      });
    }
  };

  render() {
    const { navbar_disabled, login_disabled } = this.state;
    return (
      <Router>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <SideNav
                onSelect={selected => {
                  const to = "/" + selected;
                  if (location.pathname !== to) {
                    history.push(to);
                  }
                }}
                hidden={navbar_disabled}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="login">
                  <NavItem eventKey="login" disabled={navbar_disabled}>
                    <IconTest fontSize="large" />
                  </NavItem>
                  <NavItem eventKey="devices" disabled={navbar_disabled}>
                    <IconTest />
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
              <form
                onSubmit={this.handleSubmit}
                className="login-form"
                hidden={login_disabled}
                autoComplete={"on"}
              >
                <Stack
                  horizontal
                  tokens={{ childrenGap: 50 }}
                  styles={{ root: { width: 650 } }}
                >
                  <TextField
                    label="Email"
                    id={"email_id"}
                    onChange={this.handleChange}
                    styles={{ fieldGroup: { width: 200 } }}
                    required={true}
                    autoComplete="on"
                  />
                </Stack>

                <TextField
                  id={"password_id"}
                  label="Password"
                  onChange={this.handleChange}
                  styles={{ fieldGroup: { width: 200 } }}
                  required={true}
                  type={"password"}
                  // value={this.state.password}
                />
                <PrimaryButton
                  id={"loginButton"}
                  text="Login"
                  onClick={this.loginAction}
                  allowDisabledFocus
                  disabled={!this.validateForm()}
                />
              </form>
            </React.Fragment>
          )}
        />
      </Router>
    );
  }
}

export default withCookies(App);
