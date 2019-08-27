import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { connect } from "react-redux";

import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import "./App.css";

import SideNav, { NavItem, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import { Icon } from "office-ui-fabric-react/lib/Icon";
import {
  PrimaryButton,
  Stack,
  TextField,
  initializeIcons
} from "office-ui-fabric-react";
import API_BASE_URI from "./Redux/constants/URI";
import axios from "axios";

initializeIcons();

const iconClass = mergeStyles({
  fontSize: 20,
  height: 20,
  width: 20,
  margin: "0 25px"
});

const IconTest = () => <Icon iconName="HomeSolid" className={iconClass} />;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      email: "",
      password: "",
      navbar_disabled: true,
      navbar_expanded: true,
      login_disabled: true
    };

    this.tools = {};
  }

  async componentDidMount() {
    console.log(this.state);
    const uri = `${API_BASE_URI.API_BASE_URI}/`;
    const axiosConfig = {
      headers: {
        "content-Type": "application/json",
        Accept: "/"
      },
      withCredentials: true
    };

    let response = await axios.post(uri, { void: 0 }, axiosConfig);
    const login = response.data.logged;
    console.log(login);
    if (login) {
      this.setState({
        logged: login,
        login_disabled: true,
        navbar_disabled: false
      });
    } else {
      this.setState({
        logged: login,
        login_disabled: false,
        navbar_disabled: true
      });
    }

    console.log("response", response.data);
    console.log(this.state);
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
    const uri = `${API_BASE_URI.API_BASE_URI}/login`;
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

  logoutAction = async () => {
    const uri = `${API_BASE_URI.API_BASE_URI}/logout`;
    const axiosConfig = {
      headers: {
        "content-Type": "application/json",
        Accept: "*/*"
      },
      withCredentials: true
    };
    let response = await axios.post(uri, { void: 0 }, axiosConfig);
    console.log("response", response);
    const logged = response.data.logged;
    if (!logged) {
      this.setState({
        login: false,
        navbar_disabled: true,
        login_disabled: false
      });
    }
    console.log(this.state);
  };

  expandNavBar = event => {
    if (this.state.navbar_expanded) {
      this.setState({ navbar_expanded: false });
    } else {
      this.setState({ navbar_expanded: true });
    }
  };

  async renderProjects(props) {
    const uri = `${API_BASE_URI.API_BASE_URI}/projects`;
    const axiosConfig = {
      headers: {
        "content-Type": "application/json",
        Accept: "*/*"
      },
      withCredentials: true
    };
    let response = await axios.post(uri, { void: 0 }, axiosConfig);
    console.log("!!!!!!!!!!", response.data);
    const project_names = response.data.projects;
    // let elements = [];
    // for (let i = 0; i < project_names.length; i++) {
    //   elements.push(
    //     <NavItem eventKey="projects/i">
    //       <NavText>project_names[i]</NavText>
    //     </NavItem>
    //   );
    // }
    // return { elements };
    {
      project_names.map((value, index) => {
        return <NavItem>value</NavItem>;
      });
    }
  }

  render() {
    const { navbar_expanded, login_disabled, navbar_disabled } = this.state;
    return (
      <React.Fragment>
        <SideNav
          onSelect={selected => {
            // Add your code here
          }}
          expanded={navbar_expanded}
          onToggle={this.expandNavBar}
          style={{
            width: 0,
            backgroundColor: "#34495E"
          }}
          hidden={navbar_disabled}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="projects">
            <NavItem eventKey="projects">
              <NavText>
                <IconTest /> Projects
              </NavText>
            </NavItem>
            <NavItem eventKey="charts">
              <NavText>
                <IconTest />
                Charts
              </NavText>
              <NavItem eventKey="charts/linechart">
                <NavText>Line Chart</NavText>
              </NavItem>
              <NavItem eventKey="charts/barchart">
                <NavText>Bar Chart</NavText>
              </NavItem>
            </NavItem>
            <NavItem eventKey="logout" onClick={this.logoutAction}>
              <NavText>Logout</NavText>
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
    );
  }
}

export default App;
