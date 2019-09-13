import React, { Component } from "react";
import PageWrapper from "../Layout/PageWrapper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ProjectCards from "../components/ProjectCards";
import DeleteUploadCardButton from "../components/DeleteUploadCardButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import { withStyles, withTheme } from "@material-ui/core";
import { bindActionCreators } from "redux";
import * as drawer_actions from "../Redux/actions/drawer_actions";
import * as mosaic_actions from "../Redux/actions/mosaic_actions";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddMosaicForm from "../Forms/AddMosaicForm";
import UploadShapeForm from "../Forms/UploadShapeForm";
import Loading from "../components/Loading";

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

  handleUploadShape = id => {
    const { open_upload_shape_form, mosaic_actions } = this.props;
    if (!open_upload_shape_form) {
      mosaic_actions.openUploadShapeForm(id);
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

  handleClickOnProjectButton = () => {
    console.log("refreshing", this.props);
    const { drawer_actions, history } = this.props;
    // actions.refreshToProjects();
    history.push("/project");
    drawer_actions.getProjects();
  };

  handleUploadShapeForm = values => {
    const { mosaic_actions, mosaic_opened } = this.props;
    console.log("form values shape", values);
    const { field, plot, panel } = values;
    if (field != null || plot != null || panel != null) {
      mosaic_actions
        .uploadShapeFiles(field, plot, panel, mosaic_opened)
        .then(result => {
          if ("success" in result.value.data) {
            mosaic_actions.closeUploadShapeForm();
          }
        });
    }
  };

  handleCloseUploadShapeDialog = () => {
    const { open_upload_shape_form, mosaic_actions } = this.props;
    if (open_upload_shape_form) {
      mosaic_actions.closeUploadShapeForm();
    }
  };

  render() {
    const {
      mosaics,
      open_add_mosaic_form,
      open_upload_shape_form,
      classes,
      project_opened,
      is_loading
    } = this.props;
    console.log("this is mosaic", this.props);
    return (
      <PageWrapper clickOnProjectButtonHandle={this.handleClickOnProjectButton}>
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
                  <DeleteUploadCardButton
                    id={mosaic.id}
                    project={project_opened}
                    clickOnDeleteHandler={this.handleDeleteMosaic}
                    clickOnUploadHandler={this.handleUploadShape}
                  />
                </ProjectCards>
              </GridListTile>
            ))}
          </GridList>
          <Dialog open={open_upload_shape_form}>
            <DialogTitle id="form-dialog-mosaic">Upload ShapeFile</DialogTitle>
            <DialogContent>
              <UploadShapeForm
                onSubmit={this.handleUploadShapeForm}
                handleClose={this.handleCloseUploadShapeDialog}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={open_add_mosaic_form}>
            <DialogTitle id="form-dialog-shape">Upload Mosaic</DialogTitle>
            <DialogContent>
              <AddMosaicForm
                onSubmit={this.handleSubmitMosaicForm}
                handleClose={this.handleCloseMosaicDialog}
              />
            </DialogContent>
          </Dialog>
          <Loading open={is_loading} />
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    open_add_mosaic_form: store.drawer_reducer.open_add_mosaic_form,
    mosaics: store.drawer_reducer.mosaics,
    project_opened: store.drawer_reducer.project_opened,
    open_upload_shape_form: store.mosaic_reducer.open_upload_shape_form,
    is_loading: store.mosaic_reducer.is_loading,
    mosaic_opened: store.mosaic_reducer.mosaic_opened
  };
};
const mapDispatchToProps = dispatch => {
  return {
    drawer_actions: bindActionCreators(drawer_actions, dispatch),
    mosaic_actions: bindActionCreators(mosaic_actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTheme(MosaicPage)));
