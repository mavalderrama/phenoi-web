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
import Autocomplete from "@material-ui/lab/Autocomplete";
import { bindActionCreators } from "redux";
import * as drawer_actions from "../Redux/actions/drawer_actions";
import * as auth_actions from "../Redux/actions/auth_actions";
import { connect } from "react-redux";
import { withTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    maxHeight: 400,
    minHeight: 100,
    minWidth: 100,
    "padding-bottom": "30px"
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
    // paddingTop: "30px",
    float: "right"
  }
});

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <FormControl style={{ minWidth: 250 }} required={true} error={touched}>
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  </FormControl>
);

const renderComboField = ({
  input,
  label,
  meta: { touched, error },
  children,
  data,
  ...custom
}) => {
  const required = input.value == "" ? true : false;
  return (
    <FormControl
      style={{ minWidth: 250 }}
      required={true}
      error={required && touched}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        {...input}
        children={children}
        onChange={input.onChange}
        label={label}
        error={error}
        data={data}
        {...custom}
      >
        {data.map(element => (
          <MenuItem value={element.id}>{element.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const renderComboAutoComplete = ({
  input,
  label,
  meta: { touched, error },
  children,
  data,
  ...custom
}) => {
  return (
    <FormControl style={{ minWidth: 250 }} required={true} error={touched}>
      <Autocomplete
        id="combo-box"
        options={data}
        getOptionLabel={option => option.company_name}
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            placeholder={label}
            error={touched}
            helperText={touched && error}
            fullWidth
            {...input}
            {...custom}
          />
        )}
      />
    </FormControl>
  );
};

class AdminAddUserForm extends Component {
  render() {
    const {
      handleSubmit,
      roles_available,
      companies_available,
      classes
    } = this.props;
    console.log("roles available", companies_available);
    return (
      <form onSubmit={handleSubmit}>
        <FormControl style={{ maxHeight: 600 }}>
          <FormGroup>
            <Grid container className={classes.root} spacing={0}>
              <Grid item xs={12}>
                <Grid container justify="left" spacing={2}>
                  <Grid key={0} item xs={12} sm={6}>
                    <Field
                      name="name"
                      component={renderTextField}
                      label={"Name"}
                    />
                  </Grid>
                  <Grid key={1} item xs={12} sm={6}>
                    <Field
                      name="lastname"
                      component={renderTextField}
                      label={"Last Name"}
                    />
                  </Grid>
                  <Grid key={2} item xs={12} sm={6}>
                    <Field
                      name="email"
                      component={renderTextField}
                      label={"Email"}
                    />
                  </Grid>
                  <Grid key={3} item xs={12} sm={6}>
                    <Field
                      name="company"
                      component={renderComboAutoComplete}
                      label={"Company"}
                      data={companies_available}
                    />
                  </Grid>
                  <Grid key={4} item xs={12} sm={6}>
                    <Field
                      name="phone"
                      component={renderTextField}
                      label={"Phone Number"}
                    />
                  </Grid>
                  <Grid key={5} item xs={12} sm={6}>
                    <Field
                      name="password"
                      component={renderTextField}
                      label={"Password"}
                    />
                  </Grid>
                  <Grid key={6} item xs={12} sm={6}>
                    <Field
                      name="role"
                      component={renderComboField}
                      label={"Role"}
                      data={roles_available}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>
        <Button type="submit" color="primary" className={classes.button}>
          Submit
        </Button>
      </form>
    );
  }
}

export default reduxForm({ form: "addUserForm" })(
  withStyles(styles)(withTheme(AdminAddUserForm))
);
