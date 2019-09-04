import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";

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
);

class AddProjectForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit} noValidate>
          <Field
            component={renderTextField}
            type="text"
            margin="dense"
            required
            fullWidth
            id="project_name"
            label="project Name"
            name="project_name"
            autoFocus
          />
          <Field
            component={renderTextField}
            type="text"
            margin="normal"
            fullWidth
            id="details"
            label="Details"
            name="details"
            autoFocus
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ float: "right", "padding-top": "10px" }}
          >
            Add
          </Button>
        </form>
      </div>
    );
  }
}
export default reduxForm({ form: "addProject" })(AddProjectForm);
