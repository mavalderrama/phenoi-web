import React, {Component} from "react";
import EmptyLayout from "./../../Layout/Empty"
import LoginForm from "./../../Forms/LoginForm/index";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link, withRouter} from "react-router-dom";
import Paper from "material-ui/Paper";
import {Col, Grid, Row} from 'react-flexbox-grid';
import * as actions from "./../../Redux/Actions/Auth";

class LoginPage extends Component {

    styles = {
        btn: {
            background: '#4f81e9',
            color: "white",
            padding: 7,
            borderRadius: 2,
            margin: 2,
            fontSize: 13
        },
        btnFacebook: {
            background: '#4f81e9'
        },
        btnGoogle: {
            background: '#e14441'
        },
        btnSpan: {
            marginLeft: 5
        }
    }
    getErrorMessage(statusCode) {
        switch (statusCode) {
            case 401: return "User or password incorrect";
            case 400: return "User and password cannot be empty";
            default: return "Uknown error";
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            snackbarIsOpen: false,
            snackbarMessage: ""
        };
    }
    submit = values => {
        const { actions, history } = this.props;
        actions.auth(values)
            .then((response) => {
                const token = response.value.data;
                actions.login(token);
                history.push("/");//window.location = "/";
            })
            .catch(err => {
                const errorMessage = _.isUndefined(err.response)
                    ? err.message :
                    this.getErrorMessage(err.response.status);

                this.setState({
                    snackbarIsOpen: true,
                    snackbarMessage: errorMessage
                })
            })   }
    render() {
        return (
            <EmptyLayout >
                <Grid className="centerForm" fluid >
                    <Row center="xs" style={{ height: "100vh", flex: 1, alignItems: 'center' }}>
                        <Col xs={12} md={6} lg={3} >
                            <Paper  elevation={15} style={{ paddingTop: 20 }}>
                                <LoginForm onSubmit={this.submit} />
                                <Snackbar
                                    open={this.state.snackbarIsOpen}
                                    message={this.state.snackbarMessage}
                                    autoHideDuration={2000}
                                />
                            </Paper>

                            <Button
                                color="secondary"
                                href="/register"
                                style={{ color: "gray", margin: 10 }}>
                                Register
                                <PersonAddIcon style={{marginLeft: 5}} />
                            </Button>

                            <br />
                            <br />
                            <Link to="/" style={{ ...this.styles.btn, ...this.styles.btnFacebook }}>
                                <i class="fab fa-facebook-f"></i>
                                <span style={this.styles.btnSpan}>Log in with Facebook</span>
                            </Link>
                            <Link to="/" style={{ ...this.styles.btn, ...this.styles.btnGoogle }}>
                                <i className="fab fa-google-plus-g" />
                                <span style={this.styles.btnSpan}>Log in with Google</span>
                            </Link>
                        </Col>
                    </Row>
                </Grid>
            </EmptyLayout>
        )
    }
}

const mapStateToProps = (store, ownProps) => { return {} }
const mapDispatchToProps = (dispatch) => { return { actions: bindActionCreators(actions, dispatch) } };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));