import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import { Field, reduxForm } from "redux-form";
import { withStyles } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(0)
    // minWidth: 120
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
});

// const renderTextField = ({
//   label,
//   input,
//   meta: { touched, invalid, error },
//   ...custom
// }) => (
//   <TextField
//     label={label}
//     placeholder={label}
//     error={touched && invalid}
//     helperText={touched && error}
//     {...input}
//     {...custom}
//   />
// );

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

const renderComboField = ({
  input,
  label,
  meta: { touched, invalid, error },
  children,
  roles,
  ...custom
}) => {
  const required = input.value == "" ? true : false;
  return (
    <FormControl
      style={{ minWidth: 190 }}
      required={true}
      error={required && touched}
    >
      <InputLabel>Role</InputLabel>
      <Select
        {...input}
        children={children}
        onChange={input.onChange}
        label={label}
        error={error}
        roles={roles}
        {...custom}
      >
        {roles.map(element => (
          <MenuItem value={element.id}>{element.role}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

class AdminAddUserForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  <Grid key={0} item>
                    <Field
                      name="Name"
                      component={renderTextField}
                      label={"Name"}
                    />
                  </Grid>
                  <Grid key={1} item>
                    <Field
                      name="Last_name"
                      component={renderTextField}
                      label={"Last_name"}
                    />
                  </Grid>
                  <Grid key={0} item>
                    <Field
                      name="email"
                      component={renderTextField}
                      label={"Email"}
                    />
                  </Grid>
                  <Grid key={1} item>
                    <Field
                      name="Role"
                      component={renderComboField}
                      label={"Role"}
                      // TODO please add ROLES as a DB query
                      roles={[
                        { role: "Admin", id: 1 },
                        { role: "Mortal", id: 2 }
                      ]}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>
      </form>
    );
  }
}

export default reduxForm({ form: "adminControl" })(
  withStyles(styles)(AdminAddUserForm)
);
