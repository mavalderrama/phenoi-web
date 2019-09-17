import React, { Component } from "react";
import PageWrapper from "../Layout/PageWrapper";
import ProjectCards from "../components/ProjectCards";
import DeleteCardButton from "../components/DeleteCardButton";
import { bindActionCreators } from "redux";
import * as drawer_actions from "../Redux/actions/drawer_actions";
import { connect } from "react-redux";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AddProjectForm from "../Forms/AddProjectForm";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { withStyles, withTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Loading from "../components/Loading";
import splash from "../images/splash.JPG";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  plusButton: { margin: theme.spacing(1, 0), float: "right" },
  plusIcon: { marginLeft: theme.spacing(0) },
  image: {
    backgroundImage: `url(${splash})`, //"url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
});

class ProjectsPage extends Component {
  componentDidMount() {
    const { drawer_actions } = this.props;
    drawer_actions.getProjects();
  }

  handleDeleteProject = (id, project) => {
    console.log("delete card", this.props);
    const { drawer_actions } = this.props;
    console.log("DELETE PROJECT");
    drawer_actions.deleteProject(id, project).then(result => {
      if ("success" in result.value.data) {
        drawer_actions.getProjects();
      }
    });
  };

  handleOpenCard = project => {
    const { drawer_actions, history } = this.props;
    console.log("open card", this.props);
    console.log(project);
    drawer_actions.getMosaics(project).then(result => {
      if ("success" in result.value.data) {
        history.push("/mosaics");
      }
    });
  };

  handleAddProjectButton = () => {
    const { open_add_project_form, drawer_actions } = this.props;
    if (!open_add_project_form) {
      drawer_actions.openFormAddProject();
    }
  };

  handleCloseProjectDialog = () => {
    const { open_add_project_form, drawer_actions } = this.props;
    if (open_add_project_form) {
      drawer_actions.closeFormAddProject();
    }
  };

  handleSubmitProjectForm = values => {
    const { drawer_actions } = this.props;
    const { project_name, details } = values;
    drawer_actions.createProject(project_name, details).then(result => {
      if ("success" in result.value.data) {
        drawer_actions.getProjects();
      }
    });
  };

  render() {
    const { projects, open_add_project_form, classes, is_loading } = this.props;

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
            onClick={this.handleAddProjectButton}
          >
            <AddIcon className={classes.plusIcon} />
            Create Project
          </Button>
        </Grid>
        <div>
          <GridList cellHeight={300} cols={5} spacing={20}>
            {projects.map((project, index) => (
              <GridListTile key={index} cols={1}>
                <ProjectCards
                  project={project.project_name}
                  details={project.details}
                  id={project.id}
                  clickOnOpenHandler={this.handleOpenCard}
                >
                  <DeleteCardButton
                    id={project.id}
                    project={project.project_name}
                    clickOnDeleteHandler={this.handleDeleteProject}
                  />
                </ProjectCards>
              </GridListTile>
            ))}
          </GridList>
          <Dialog
            open={open_add_project_form}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
            <DialogContent>
              <AddProjectForm
                onSubmit={this.handleSubmitProjectForm}
                handleClose={this.handleCloseProjectDialog}
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
    projects: store.drawer_reducer.projects,
    open_add_project_form: store.drawer_reducer.open_add_project_form,
    is_loading: store.drawer_reducer.is_loading
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
)(withStyles(styles)(withTheme(ProjectsPage)));
