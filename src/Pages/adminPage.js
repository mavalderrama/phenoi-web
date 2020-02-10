import React, { Component } from "react";
import PageWrapper from "../Layout/PageWrapper";
import { bindActionCreators } from "redux";
import * as mosaic_actions from "../Redux/actions/mosaic_actions";
import { connect } from "react-redux";
import { withStyles, withTheme } from "@material-ui/core";
import adminForm from "../Forms/AdminAddUserForm";
import WorkIcon from "@material-ui/icons/Work";

class AdminPage extends Component {
  handleClickOnProjectButton = () => {
    console.log("refreshing", this.props);
    const { history } = this.props;
    history.push("/");
  };

  render() {
    let buttons = [
      {
        handle: this.handleClickOnProjectButton,
        name: "Projects",
        icon: <WorkIcon />
      }
    ];
    return (
      <PageWrapper
        history={this.props.history}
        actual={"Admin"}
        drawer_buttons={buttons}
      >
        <adminForm />
      </PageWrapper>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    is_loading: store.editor_reducer.is_loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    mosaic_actions: bindActionCreators(mosaic_actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTheme(AdminPage)));
