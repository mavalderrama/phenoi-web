import "date-fns";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FormGroup from "@material-ui/core/FormGroup";

export const FileTextField = ({
  input,
  label,
  disabled,
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
        disabled={disabled}
      >
        <AddIcon />
        {label}
      </Button>
      <input
        style={{ display: "none" }}
        accept=".zip"
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

class UploadShapeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableFieldShape: false,
      enablePlotShape: false,
      enablePanelShape: false
    };
  }

  handleEnableCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
    console.log(name, event.target.checked);
  };

  render() {
    const { handleSubmit, handleClose, classes } = this.props;
    const { enableFieldShape, enablePlotShape, enablePanelShape } = this.state;
    return (
      <div>
        <form
          onSubmit={handleSubmit}
          className={classes.container}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enableFieldShape}
                    onChange={this.handleEnableCheckbox("enableFieldShape")}
                  />
                }
                label="Upload Field Shape"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enablePlotShape}
                    onChange={this.handleEnableCheckbox("enablePlotShape")}
                  />
                }
                label="Upload Plot Shape"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enablePanelShape}
                    onChange={this.handleEnableCheckbox("enablePanelShape")}
                  />
                }
                label="Upload Panels Shape"
              />
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <Field
                name="field"
                component={FileTextField}
                label={"Select Field ShapeFile"}
                disabled={!enableFieldShape}
              />
              <Field
                name="plot"
                component={FileTextField}
                label={"Select Plot ShapeFile"}
                disabled={!enablePlotShape}
              />
              <Field
                name="panel"
                component={FileTextField}
                label={"Select Panels ShapeFile"}
                disabled={!enablePanelShape}
              />
            </FormGroup>
          </FormControl>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              className={classes.button}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Upload
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
export default reduxForm({ form: "addShape" })(
  withStyles(styles)(UploadShapeForm)
);
