import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
    const { handleSubmit, handleClose } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
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
          />
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                <Grid key={0} item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                    // style={{ "padding-right": "10px" }}
                  >
                    Close
                  </Button>
                </Grid>
                <Grid key={1} item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    // style={{ float: "right", "padding-top": "10px" }}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
export default reduxForm({ form: "addProject" })(AddProjectForm);
