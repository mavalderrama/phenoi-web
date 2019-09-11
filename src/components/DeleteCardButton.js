import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class DeleteCardButton extends Component {
  handleClickOnDelete = () => {
    console.log("click on delete card", this.props);
    const { clickOnDeleteHandler, id, project } = this.props;
    clickOnDeleteHandler(id, project);
  };

  render() {
    return (
      <div>
        <Button size="small" color="primary" onClick={this.handleClickOnDelete}>
          Delete
        </Button>
      </div>
    );
  }
}
