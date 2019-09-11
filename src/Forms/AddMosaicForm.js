import "date-fns";
import React, { Component, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const required = value => (value == null ? "Required" : undefined);

const DateField = props => {
  const {
    meta: { submitting, error, touched },
    input: { onBlur, value, ...inputProps },
    ...others
  } = props;

  const onChange = date => {
    Date.parse(date)
      ? inputProps.onChange(date.toISOString())
      : inputProps.onChange(null);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...inputProps}
        {...others}
        format="dd/MM/yyyy"
        value={value ? new Date(value) : Date.now()}
        disabled={submitting}
        onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
        error={error && touched}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  );
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  return (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );
};

const renderComboField = ({
  input,
  label,
  meta: { touched, invalid, error },
  children,
  ...custom
}) => {
  const required = input.value == "" ? true : false;
  return (
    <FormControl
      style={{ minWidth: 190 }}
      required={true}
      error={required && touched}
    >
      <InputLabel>Mosaic Type</InputLabel>
      <Select
        {...input}
        // inputProps={{
        //   id: "type-required"
        // }}
        children={children}
        onChange={input.onChange}
        label={label}
        error={error}
        {...custom}
      >
        <MenuItem value={"MS"}>Multi Spectral</MenuItem>
        <MenuItem value={"RGB"}>RGB</MenuItem>
        <MenuItem value={"TH"}>Thermal</MenuItem>
      </Select>
    </FormControl>
  );
};

const renderCheckbox = ({ input, label }) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={input.value ? true : false}
            onChange={input.onChange}
          />
        }
        label={label}
      />
    </div>
  );
};

export const FileTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  delete input.value;
  console.log(input);
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => input.fileUpload.click()}
      >
        <AddIcon />
        Select Mosaic
      </Button>
      <input
        style={{ display: "none" }}
        accept=".tif"
        id="contained-button-file"
        type="file"
        ref={fileUpload => {
          input.fileUpload = fileUpload;
        }}
        {...input}
        {...custom}
      />
    </div>
  );
};

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  FFS: {
    position: "absolute",
    lineHeight: "1.5",
    top: "38",
    transition: "none",
    zIndex: "1",
    transform: "none",
    transformOrigin: "none",
    pointerEvents: "none",
    userSelect: "none",
    fontSize: "16",
    color: "rgba(0, 0, 0, 0.8)"
  },
  exampleImageInput: {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    opacity: 0
  }
});

class AddMosaicForm extends Component {
  render() {
    const { handleSubmit, handleClose, classes } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <GridList cellHeight={"auto"} cols={1} spacing={0}>
            <GridListTile cols={1} rows={0.8} key={0}>
              <Field
                component={renderTextField}
                type="text"
                margin="normal"
                required
                id="name"
                label="Mosaic Name"
                // autoFocus
                name="name"
              />
            </GridListTile>
            <GridListTile cols={1} rows={0.8} key={1}>
              <Field component={renderComboField} name="combo" />
            </GridListTile>
            <GridListTile cols={1} rows={0.8} key={6}>
              <Field
                component={renderTextField}
                type="text"
                margin="normal"
                required
                id="stage"
                label="Crop Stage"
                // autoFocus
                name="stage"
              />
            </GridListTile>

            <GridListTile cols={1} key={2}>
              <Field name="date" component={DateField} required />
            </GridListTile>
            <GridListTile cols={1} key={3}>
              <Field
                name="calibrated"
                component={renderCheckbox}
                label="Pre-Calibrated?"
                required
              />
            </GridListTile>
            <GridListTile cols={1} key={4}>
              <Field name="image" component={FileTextField} />
            </GridListTile>
          </GridList>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                <Grid key={0} item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClose()}
                    // style={{ "padding-right": "10px" }}
                  >
                    Close
                  </Button>
                </Grid>
                <Grid key={5} item>
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
export default reduxForm({ form: "addMosaic" })(
  withStyles(styles)(AddMosaicForm)
);
