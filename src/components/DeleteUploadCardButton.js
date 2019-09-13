import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class DeleteUploadCardButton extends Component {
  handleClickOnDelete = () => {
    console.log("click on delete card", this.props);
    const { clickOnDeleteHandler, id, project } = this.props;
    clickOnDeleteHandler(id, project);
  };

  handleClickOnUpload = () => {
    console.log("click on upload shape card", this.props);
    const { clickOnUploadHandler, id, project } = this.props;
    clickOnUploadHandler(id, project);
  };

  render() {
    return (
      <div>
        <Button size="small" color="primary" onClick={this.handleClickOnUpload}>
          Upload Shapefile
        </Button>
        <Button size="small" color="primary" onClick={this.handleClickOnDelete}>
          Delete
        </Button>
      </div>
    );
  }
}
