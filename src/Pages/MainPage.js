import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as drawer_actions from "./../Redux/actions/drawer_actions";
import clsx from "clsx";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import WorkIcon from "@material-ui/icons/Work";
import { deepOrange } from "@material-ui/core/colors";
import { Avatar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import * as auth_actions from "../Redux/actions/auth_actions";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import MediaCard from "../components/ProjectCards";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AddProjectForm from "./../Forms/AddProjectForm";
import AddMosaicForm from "../Forms/AddMosaicForm";
import Loading from "./../components/Loading";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  gridList: {
    width: 500,
    height: 450
  },
  plusButton: { margin: theme.spacing(1, 0), float: "right" },
  plusIcon: { marginLeft: theme.spacing(0) },
  cloudIcon: { marginLeft: theme.spacing(1) }
});

class MainPage extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.getProjects();
  }

  handleDrawerOpen = () => {
    const { actions } = this.props;
    actions.setOpen();
  };

  handleDrawerClose = () => {
    const { actions } = this.props;
    actions.setClose();
  };

  handleClickOnProject = () => {
    console.log("open project", this.props);
    const { actions, expand_projects } = this.props;
    if (!expand_projects) {
      // actions.expandProjects();
    } else {
      // actions.closeProjects();
    }
  };
  handleClickOnMosaic= (mosaic_id)=>{
      this.props.history.push(`/mosaic/${mosaic_id}`)
  };
  handleDeleteProject(vals) {
    console.log("delete Project", vals);
  }

  handleLogout = () => {
    const { auth_actions } = this.props;
    console.log("props", this.props);
    auth_actions.logout();
  };

  submitProjectForm = values => {
    const { actions } = this.props;
    const project_name = values.project_name;
    const details = values.details;
    actions.createProject(project_name, details).then(result => {
      if ("success" in result.value.data) {
        actions.getProjects();
      }
    });
  };

  submitMosaicForm = values => {
    const { actions, project_opened } = this.props;
    const { combo, stage, image, name } = values;
    let { calibrated, date } = values;
    if (calibrated == null) calibrated = false;
    if (date == null) {
      date = new Date().toLocaleDateString("en-US");
    } else {
      date = new Date(date).toLocaleDateString("en-US");
    }
    if (image != null) {
      actions
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
            actions.getMosaics(project_opened);
          }
        });
    }
  };

  renderProjects() {
    console.log("this are projects", this.props.projects);
    return this.props.projects.map((project, index) => (
      <GridListTile key={index} cols={1}>
        <MediaCard
          title={project.project_name}
          details={project.details}
          id={project.id}
          type={"PROJECT"}
          onClick={() => this.handleClickOnProject}
          del={() => this.handleDeleteProject} //!!!!!!!!!!!!!!!!!!!!!CHANGEMEEEEEEEEEEEEEEEEEEEEEEE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        />
      </GridListTile>
    ));
  }

  renderMosaics() {
    console.log("render mosaics props", this.props);
    const { project_opened } = this.props;
    return this.props.mosaics.map((mosaic, index) => (
      <GridListTile key={index} cols={1}>
        <MediaCard
          title={mosaic.mosaic_name}
          details={mosaic.stage}
          project={project_opened}
          id={mosaic.id}
          type={"MOSAIC"}
          clickHandler={this.handleClickOnMosaic}
          delete={() => this.handleClickOnProject} //!!!!!!!!!!!!!!!!!!!!!CHANGEMEEEEEEEEEEEEEEEEEEEEEEE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        />
      </GridListTile>
    ));
  }

  handleAddProjectButton = () => {
    const { open_add_project_form, actions } = this.props;
    if (!open_add_project_form) {
      actions.openFormAddProject();
    }
  };

  handleAddMosaicButton = () => {
    const { open_add_mosaic_form, actions } = this.props;
    if (!open_add_mosaic_form) {
      actions.openFormAddMosaic();
    }
  };

  handleCloseProjectDialog = () => {
    const { open_add_project_form, actions } = this.props;
    if (open_add_project_form) {
      actions.closeFormAddProject();
    }
  };

  handleCloseMosaicDialog = () => {
    const { open_add_mosaic_form, actions } = this.props;
    if (open_add_mosaic_form) {
      actions.closeFormAddMosaic();
    }
  };

  renderAddProject() {
    const { open_add_project_form } = this.props;
    return (
      <Dialog
        open={open_add_project_form}
        onClose={this.handleAddProjectButton}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
        <DialogContent>
          <AddProjectForm
            onSubmit={this.submitProjectForm}
            handleClose={() => this.handleCloseProjectDialog}
          />
        </DialogContent>
      </Dialog>
    );
  }

  addProjectButton() {
    const { classes } = this.props;
    return (
      <Button
        variant="contained"
        color="default"
        className={classes.plusButton}
        onClick={this.handleAddProjectButton}
      >
        <AddIcon className={classes.plusIcon} />
        Create Project
      </Button>
    );
  }

  addMosaicButton() {
    const { classes } = this.props;
    return (
      <Button
        variant="contained"
        color="default"
        className={classes.plusButton}
        onClick={this.handleAddMosaicButton}
      >
        Upload Mosaic
        <CloudUploadIcon className={classes.cloudIcon} />
      </Button>
    );
  }

  renderAddMosaic() {
    const { open_add_mosaic_form } = this.props;
    return (
      <Dialog
        open={open_add_mosaic_form}
        // onClose={this.handleAddMosaicButton}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-mosaic">Upload Mosaic</DialogTitle>
        <DialogContent>
          <AddMosaicForm
            onSubmit={this.submitMosaicForm}
            handleClose={() => this.handleCloseMosaicDialog}
          />
        </DialogContent>
      </Dialog>
    );
  }

  handleClickOnProjectButton = () => {
    console.log("refreshing");
    const { actions } = this.props;
    actions.refreshToProjects();
    actions.getProjects();
  };

  render() {
    const { classes, theme, open, open_project, is_loading } = this.props;
    let cards;
    let add_dialog;
    let add_dialog_button;
    if (open_project) {
      cards = this.renderMosaics();
      add_dialog = this.renderAddMosaic();
      add_dialog_button = this.addMosaicButton();
    } else {
      cards = this.renderProjects();
      add_dialog = this.renderAddProject();
      add_dialog_button = this.addProjectButton();
    }
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Pheno-i Image Analysis Tool
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Avatar className={classes.orangeAvatar}>N</Avatar>
          </Grid>
          <List>
            <ListItem button onClick={this.handleClickOnProjectButton}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={"Projects"} />
            </ListItem>
            <ListItem button onClick={this.handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
          <Divider />
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            {add_dialog_button}
          </Grid>
          {add_dialog}
          <div>
            <GridList cellHeight={300} cols={5} spacing={20}>
              {cards}
            </GridList>
            <Loading open={is_loading} />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    open: store.drawer_reducer.open,
    projects: store.drawer_reducer.projects,
    open_project: store.drawer_reducer.open_project,
    mosaics: store.drawer_reducer.mosaics,
    expand_projects: store.drawer_reducer.expand_projects,
    is_loading: store.drawer_reducer.is_loading,
    is_authenticated: store.auth_reducer.is_authenticated,
    open_add_project_form: store.drawer_reducer.open_add_project_form,
    open_add_mosaic_form: store.drawer_reducer.open_add_mosaic_form,
    project_opened: store.drawer_reducer.project_opened
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(drawer_actions, dispatch),
    auth_actions: bindActionCreators(auth_actions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTheme(MainPage)));
