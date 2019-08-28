import React, {Component} from "react";
import PageWrapper from "../Layout/PageWrapper";
import {connect} from "react-redux"
import { bindActionCreators } from "redux"
import * as auth_actions from "./../Redux/actions/auth_actions"
import LoginForm from "../Forms/LoginForm";
import Paper from "@material-ui/core/Paper";


class LoginPage extends Component {
    constructor(props) {
        super(props);
    }
    login=(values)=>{
        const {actions} = this.props;
        actions.login(values.username, values.password)
    };
    render() {
        return (
            <PageWrapper>
                <Paper style={{width: 200, padding: 20, margin: 30}}>
                    <LoginForm onSubmit={this.login}/>
                </Paper>
            </PageWrapper>)
    }
    // render() {
    //     var {is_authenticated} = this.props;
    //     return (<PageWrapper>
    //         Login Page!!! <br/>
    //         <button onClick={this.login}>ok</button>
    //         <br/>
    //         <p>{is_authenticated ? "yes" : "not"}</p>
    //     </PageWrapper>)
    // }
}

const mapStateToProps = (store, ownProps)=>{
    return{
        is_authenticated: store.auth_reducer.is_authenticated,
        users:store.users_reducer.users,
    }
};
const mapDispatchToProps = (dispatch) => { return { actions: bindActionCreators(auth_actions, dispatch) } };
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)