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
import WorkIcon from "@material-ui/icons/Work";
import { deepOrange } from "@material-ui/core/colors";
import { Avatar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Loading from "../components/Loading";
import * as auth_actions from "../Redux/actions/auth_actions";

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

class PageWrapper extends Component {
  handleDrawerOpen = () => {
    const { actions } = this.props;
    actions.setOpen();
  };

  handleDrawerClose = () => {
    const { actions } = this.props;
    actions.setClose();
  };

  handleLogout = () => {
    const { auth_actions } = this.props;
    console.log("props", this.props);
    auth_actions.logout();
  };

  render() {
    const {
      classes,
      theme,
      open,
      clickOnProjectButtonHandle,
      is_loading
    } = this.props;
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
            <ListItem button onClick={clickOnProjectButtonHandle}>
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
          <div>{this.props.children}</div>
        </main>
        <Loading open={is_loading} />
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
)(withStyles(styles)(withTheme(PageWrapper)));
