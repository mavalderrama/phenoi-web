import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

export default class Loading extends Component {
  render() {
    const { open } = this.props;
    return (
      <Dialog open={open}>
        <Paper>
          <CircularProgress
            style={{
              display: "block",
              "margin-left": "auto",
              "margin-right": "auto"
            }}
          />
          <TextField
            disabled
            id="standard-disabled"
            defaultValue="Loading..."
            style={{
              // display: "block",
              "margin-left": "auto",
              "margin-right": "auto"
            }}
          />
        </Paper>
      </Dialog>
    );
  }
}
