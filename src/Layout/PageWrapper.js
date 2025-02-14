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
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ListItemText from "@material-ui/core/ListItemText";
import WorkIcon from "@material-ui/icons/Work";
import { deepOrange } from "@material-ui/core/colors";
import { Avatar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import * as auth_actions from "../Redux/actions/auth_actions";
import splash from "../images/satreps.jpg";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";
import AdminAddUserForm from "../Forms/AdminAddUserForm";
import CloseIcon from "@material-ui/icons/Close";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    height: "100vh",
    backgroundImage: `url(${splash})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
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
    padding: theme.spacing(2)
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
  cloudIcon: { marginLeft: theme.spacing(1) },
  list: {
    width: 250
  },
  image: {
    backgroundImage: `url(${splash})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  grow: {
    flexGrow: 1
  },
  adminConsoleDialogCloseButton: {
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
    marginLeft: theme.spacing(2)
  }
});

class PageWrapper extends Component {
  componentDidMount() {
    const { auth_actions, actions, admin } = this.props;
    auth_actions.checkRoles(sessionStorage.getItem("user")).then(response => {
      if (response.value.data.role) {
        actions.fetch_roles();
        actions.fetchCompanies();
      }
    });
  }

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

  handleAdminConsole = () => {
    const { admin, actions } = this.props;
    if (admin) {
      console.log("open admin console", admin);
      actions.openAdminConsole();
    }
  };

  handleCloseAdminConsole = () => {
    const { admin, actions } = this.props;
    if (admin) {
      actions.closeAdminConsole();
    }
  };

  handleTabChange = (event, state) => {
    const { actions } = this.props;
    actions.changeAdminTab(state);
  };

  handleSubmitAdminConsole = values => {
    console.log("submitting", values);
    const { actions } = this.props;
    actions.submitAddUser(values);
  };

  render() {
    const menuId = "primary-search-account-menu";
    const {
      classes,
      theme,
      open,
      bread,
      drawer_buttons,
      admin,
      admin_console,
      admin_console_tab,
      roles_available,
      companies_available
    } = this.props;
    console.log("admin", admin);
    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <Typography
          component="div"
          role="tabpanel"
          hidden={value !== index}
          id={`scrollable-prevent-tabpanel-${index}`}
          aria-labelledby={`scrollable-prevent-tab-${index}`}
          {...other}
        >
          {/*Box size can be determined by p*/}
          {value === index && <Box p={2}>{children}</Box>}
        </Typography>
      );
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
              CIAT Pheno i Image Analysis Tool
              {/*<Breadcrumbs*/}
              {/*  separator={<NavigateNextIcon fontSize="small" />}*/}
              {/*  aria-label="breadcrumb"*/}
              {/*></Breadcrumbs>*/}
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
            {drawer_buttons.map((button_obj, index) => (
              <ListItem button onClick={button_obj.handle} key={index}>
                <ListItemIcon>{button_obj.icon}</ListItemIcon>
                <ListItemText primary={button_obj.name} />
              </ListItem>
            ))}
            <Divider />
            {admin && (
              <ListItem button onClick={this.handleAdminConsole}>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary={"Admin Panel"} />
              </ListItem>
            )}
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
          {this.props.children}
        </main>
        <Dialog
          open={admin_console}
          onClose={this.handleCloseAdminConsole}
          aria-labelledby="form-dialog"
        >
          <h2 className={classes.adminConsoleDialogCloseButton}>
            Admin Console
            <IconButton
              onClick={this.handleCloseAdminConsole}
              style={{ padding: 0, "border-radius": "0%", float: "right" }}
            >
              <CloseIcon />
            </IconButton>
          </h2>

          <DialogContent>
            <Paper variant="outlined">
              <Tabs
                value={admin_console_tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleTabChange}
              >
                <Tab label={"Add Company"} />
                <Tab label="Add User" />
                <Tab label="Administration" />
              </Tabs>
            </Paper>
            <TabPanel value={admin_console_tab} index={0}>
              <AdminAddUserForm roles_available={roles_available} />
            </TabPanel>
            <TabPanel value={admin_console_tab} index={1}>
              <AdminAddUserForm
                onSubmit={this.handleSubmitAdminConsole}
                companies_available={companies_available}
                roles_available={roles_available}
              />
            </TabPanel>
          </DialogContent>
          {/*<DialogActions>*/}
          {/*  <Button onClick={this.handleCloseAdminConsole} color="primary">*/}
          {/*    Close*/}
          {/*  </Button>*/}
          {/*</DialogActions>*/}
        </Dialog>
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
    is_authenticated: store.auth_reducer.is_authenticated,
    admin: store.auth_reducer.admin,
    open_add_project_form: store.drawer_reducer.open_add_project_form,
    open_add_mosaic_form: store.drawer_reducer.open_add_mosaic_form,
    project_opened: store.drawer_reducer.project_opened,
    bread: store.drawer_reducer.bread,
    admin_console: store.drawer_reducer.admin_console,
    admin_console_tab: store.drawer_reducer.admin_console_tab,
    roles_available: store.drawer_reducer.roles_available,
    companies_available: store.drawer_reducer.companies_available
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
