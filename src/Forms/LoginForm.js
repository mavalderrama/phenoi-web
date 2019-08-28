import React, {Component} from "react";
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'


const renderTextField = ({
                             label,
                             input,
                             meta: { touched, invalid, error },
                             ...custom
                         }) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)


class LoginForm extends Component{

    render() {
        const { handleSubmit } = this.props
        return(
            <form onSubmit={handleSubmit}>
            <div>
                <Field name="username" component={renderTextField} label="Login"  type="email" />
            </div>
            <div>
                <Field name="password" component={renderTextField} label="Password"  type="password" />
            </div>
            <button type="submit">Submit</button>
        </form>)
    }
}
export default reduxForm({form: 'login'})(LoginForm);