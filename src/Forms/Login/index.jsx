import React,{Component } from "react";
import {reduxForm, Field  } from "redux-form";
import Button from 'material-ui/Button';
import { Grid, Row, Col} from 'react-flexbox-grid';
class LoginForm extends Component{
    render(){
        const { handleSubmit } = this.props
        return(
            <form className="login-form" onSubmit={handleSubmit} style={{ padding: 20}}>
             <Grid >
                 <Row>
                    <Col md={3} >
                        <UserIcon  />
                    </Col>
                    <Col md={9} >
                    <Field
                        label="username"
                        name="userName"
                        autoComplete="off"
                        type="text"
                        validate={required}
                        component={MuiTextField}
                         />
                    </Col>
                </Row>
                <Row>
                    <Col md={3} >
                        <PasswordIcon />
                    </Col>
                    <Col md={9}>
                        <Field
                        label="password"
                        autoComplete="off"
                        validate={required}
                        name="password"
                        component={PasswordField}
                         />
                    </Col>
                </Row>
                <Row >
                    <Col md={12}>
                        <Button
                        type="submit"
                        color="primary"
                        variant="raised"
                        style={{ margin: 10 }}>
                        Login
                        </Button>
                    </Col>
                </Row>
                <Row center={"sm"} >
                    <Col sm={12} >
                        <Field name="rememberMe"

                        component={MuiCheckBox}
                        label="Remember me" />
                    </Col>
                </Row>
            </Grid>
            </form>
        )
    }
}

export default reduxForm({form: 'login',destroyOnUnmount: true,forceUnregisterOnUnmount: true})(LoginForm)