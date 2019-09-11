import React, { Component } from "react";
import PageWrapper from "../Layout/PageWrapper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ProjectCards from "../components/ProjectCards";
import DeleteCardButton from "../components/DeleteCardButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AddProjectForm from "../Forms/AddProjectForm";
import { connect } from "react-redux";
import { withStyles, withTheme } from "@material-ui/core";
import { bindActionCreators } from "redux";
import * as drawer_actions from "../Redux/actions/drawer_actions";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddMosaicForm from "../Forms/AddMosaicForm";

const styles = theme => ({
  plusButton: { margin: theme.spacing(1, 0), float: "right" },
  cloudIcon: { marginLeft: theme.spacing(1) }
});

class MosaicPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    // axios.get("get_resource").then(res=>{
    //     var img = res.data
    // })
  }

  handleOpenCard = (project, id) => {
    const { drawer_actions, history } = this.props;
    console.log("open card mosaic", this.props);
    console.log(project);
    drawer_actions.getMosaics(project).then(result => {
      if ("success" in result.value.data) {
        history.push("/mosaics");
      }
    });
  };

  handleAddMosaicButton = () => {
    const { open_add_mosaic_form, drawer_actions } = this.props;
    if (!open_add_mosaic_form) {
      drawer_actions.openFormAddMosaic();
    }
  };

  handleSubmitMosaicForm = values => {
    const { drawer_actions, project_opened } = this.props;
    console.log(values);
    const { combo, stage, image, name } = values;
    let { calibrated, date } = values;
    if (calibrated == null) calibrated = false;
    if (date == null) {
      date = new Date().toLocaleDateString("en-US");
    } else {
      date = new Date(date).toLocaleDateString("en-US");
    }
    if (image != null) {
      drawer_actions
        .createMosaic(
          combo,
          stage,
          image,
          calibrated,
          project_opened,
          date,
          name
        )
        .then(result => {
          if ("success" in result.value.data) {
            drawer_actions.getMosaics(project_opened);
          }
        });
    }
  };

  handleCloseMosaicDialog = () => {
    const { open_add_mosaic_form, drawer_actions } = this.props;
    if (open_add_mosaic_form) {
      drawer_actions.closeFormAddMosaic();
    }
  };

  handleDeleteMosaic = (id, mosaic) => {
    console.log("delete card", this.props);
    const { drawer_actions, project_opened } = this.props;
    console.log("DELETE PROJECT");
    drawer_actions.deleteMosaic(id, mosaic).then(result => {
      if ("success" in result.value.data) {
        drawer_actions.getMosaics(project_opened);
      }
    });
  };

  render() {
    const {
      mosaics,
      open_add_mosaic_form,
      classes,
      project_opened
    } = this.props;
    console.log("this is mosaic", this.props);
    return (
      <PageWrapper>
        <Grid
          container
          alignItems="flex-start"
          justify="flex-end"
          direction="row"
        >
          <Button
            variant="contained"
            color="default"
            className={classes.plusButton}
            onClick={this.handleAddMosaicButton}
          >
            Upload Mosaic
            <CloudUploadIcon className={classes.cloudIcon} />
          </Button>
        </Grid>
        <div>
          <GridList cellHeight={300} cols={5} spacing={20}>
            {mosaics.map((mosaic, index) => (
              <GridListTile key={index} cols={1}>
                <ProjectCards
                  project={mosaic.mosaic_name}
                  details={mosaic.details}
                  id={mosaic.id}
                  clickOnOpenHandler={this.handleOpenCard}
                >
                  <DeleteCardButton
                    id={mosaic.id}
                    project={project_opened}
                    clickOnDeleteHandler={this.handleDeleteMosaic}
                  />
                </ProjectCards>
              </GridListTile>
            ))}
          </GridList>
          <Dialog
            open={open_add_mosaic_form}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
          >
            <DialogTitle id="form-dialog-mosaic">Upload Mosaic</DialogTitle>
            <DialogContent>
              <AddMosaicForm
                onSubmit={this.handleSubmitMosaicForm}
                handleClose={this.handleCloseMosaicDialog}
              />
            </DialogContent>
          </Dialog>
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    open_add_mosaic_form: store.drawer_reducer.open_add_mosaic_form,
    mosaics: store.drawer_reducer.mosaics,
    project_opened: store.drawer_reducer.project_opened
  };
};
const mapDispatchToProps = dispatch => {
  return {
    drawer_actions: bindActionCreators(drawer_actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTheme(MosaicPage)));
