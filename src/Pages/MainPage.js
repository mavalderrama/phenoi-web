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
import MediaCard from "./../Forms/ProjectCards";

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
  }
});

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

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

  handleProjectsExpand = () => {
    const { actions, expand_projects } = this.props;
    if (!expand_projects) {
      actions.expandProjects();
    } else {
      actions.closeProjects();
    }
  };

  handleLogout = () => {
    const { auth_actions } = this.props;
    console.log("props", this.props);
    auth_actions.logout();
  };

  render() {
    console.log("drawer", this.props.is_authenticated);

    const { classes, theme, open, projects, expand_projects } = this.props;
    const projects_map = projects;
    console.log("test", projects_map);
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
            <ListItem button onClick={this.handleProjectsExpand}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={"Projects"} />
              {expand_projects ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {/*<Collapse in={expand_projects && open} timeout="auto" unmountOnExit>*/}
            {/*  <List component="div" disablePadding>*/}
            {/*    {projects.map(text => (*/}
            {/*      <ListItem button key={text} className={classes.nested}>*/}
            {/*        <ListItemIcon>*/}
            {/*          <PhotoLibraryIcon />*/}
            {/*        </ListItemIcon>*/}
            {/*        <ListItemText primary={text} />*/}
            {/*      </ListItem>*/}
            {/*    ))}*/}
            {/*  </List>*/}
            {/*</Collapse>*/}
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

          <GridList cellHeight={280} cols={5} spacing={20}>
            {projects_map.map(project => (
              <GridListTile key={project.project_name} cols={1}>
                <MediaCard
                  title={project.project_name}
                  details={project.details}
                />
              </GridListTile>
            ))}
          </GridList>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    open: store.drawer_reducer.open,
    projects: store.drawer_reducer.projects,
    expand_projects: store.drawer_reducer.expand_projects,
    is_loading: store.drawer_reducer.is_loading,
    is_authenticated: store.auth_reducer.is_authenticated
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
