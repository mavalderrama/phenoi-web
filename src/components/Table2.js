import React, { Component } from "react";
// import MaterialTable from "material-table";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: "relative",
    minHeight: 200
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  input: {
    display: "none"
  }
});

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Fab
          aria-label={"add"}
          className={classes.fab}
          color={"primary"}
          size="medium"
          onClick={() => this.fileUpload.click()}
        >
          <AddIcon />
        </Fab>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          ref={fileUpload => {
            this.fileUpload = fileUpload;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    // open: store.drawer_reducer.open,
    // projects: store.drawer_reducer.projects,
    // expand_projects: store.drawer_reducer.expand_projects,
    // is_loading: store.drawer_reducer.is_loading,
    // is_authenticated: store.auth_reducer.is_authenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // actions: bindActionCreators(drawer_actions, dispatch),
    // auth_actions: bindActionCreators(auth_actions, dispatch)
  };
};
export default withStyles(styles)(Table);
