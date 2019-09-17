import React, { Component } from "react";
import PageWrapper from "../Layout/PageWrapper";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as mosaic_actions from "../Redux/actions/mosaic_actions";
import * as editor_actions from "../Redux/actions/editor_actions";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import WidgetsIcon from "@material-ui/icons/Widgets";
import PhotoSizeSelectSmallIcon from "@material-ui/icons/PhotoSizeSelectSmall";
import { fabric } from "fabric";
import PolyToolSelection from "../components/PolygonToolSelection";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CategoryIcon from "@material-ui/icons/Category";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import LayersIcon from "@material-ui/icons/Layers";
import ImageIcon from "@material-ui/icons/Image";
import EcoIcon from "@material-ui/icons/Eco";
import { withStyles, withTheme } from "@material-ui/core";
import Loading from "../components/Loading";

const styles = theme => ({
  list: {
    width: 250
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

class EditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_tools: false,
      advanced_tools: false,
      is_loadingl: false,
      panning: false,
      editMode: false
    };
    this.tools = {};
  }
  componentDidMount() {
    this.canvas = new fabric.Canvas("c", {
      selection: false,
      preserveObjectStacking: true
    });
    this.canvas.setWidth(9000);
    this.canvas.setHeight(9000);
    this.canvas.on("mouse:wheel", this.onMouseWheel);
    this.canvas.on("mouse:up", this.onMouseUp);
    this.canvas.on("mouse:down", this.onMouseDown);
    this.canvas.on("mouse:out", this.onMouseOut);
    this.canvas.on("mouse:move", this.onMouseMove);
    this.tools["Polygon"] = new PolyToolSelection(this.canvas);

    this.load_raster();
  }

  update = e => {
    Object.keys(this.tools).forEach(control => {
      this.tools[control].onMouseAction(e);
    });
  };
  onMouseUp = e => {
    this.update(e);
    this.setState({ panning: false });
  };
  onMouseDown = e => {
    this.update(e);
    this.setState({ panning: true });
  };
  onMouseOut = e => {
    this.update(e);
    this.setState({ panning: false });
  };
  onMouseMove = e => {
    this.update(e);
    const { panning, editMode } = this.state;
    if (!editMode && panning && e && e.e) {
      var delta = new fabric.Point(e.e.movementX, e.e.movementY);
      this.canvas.relativePan(delta);
    }
  };

  onMouseWheel = opt => {
    const { editMode } = this.state;
    if (editMode) {
      var delta = opt.e.deltaY;
      var zoom = this.canvas.getZoom();
      zoom = zoom - delta / 500;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      this.canvas.setZoom(zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    }
  };

  load_raster = async () => {
    const { editor_actions } = this.props;
    const { params } = this.props.match;
    editor_actions.getMosaic(params.id).then(async response => {
      editor_actions.loading(true);
      const {
        value: { data }
      } = response;
      if ("raster" in data) {
        let layers = data.raster;
        let image = await this.load_layer(layers[layers.length - 1]);
        this.canvas.add(image);
        // let images = await Promise.all(
        //   layers.map(layer => this.load_layer(layer))
        // );
        // images.forEach(img => {
        //   this.canvas.add(img);
        // });
        this.canvas.renderAll();
        editor_actions.loading(false);
      }
    });
  };

  load_layer = base64Img => {
    return new Promise((resolve, reject) => {
      base64Img = `data:image/jpeg;base64,${base64Img}`;
      fabric.Image.fromURL(base64Img, img => {
        //img.scale(this.scale);
        return resolve(img);
      });
    });
  };

  renderButton = () => {
    const { open_tools } = this.state;
    console.log(open_tools);
    if (open_tools) {
      this.setState({ open_tools: false });
    } else {
      this.setState({ open_tools: true });
    }
  };

  openAdvancedTools = () => {
    const { advanced_tools } = this.state;
    console.log(advanced_tools);
    if (advanced_tools) {
      this.setState({ advanced_tools: false });
    } else {
      this.setState({ advanced_tools: true });
    }
  };

  activateZoom = () => {
    const { editMode } = this.state;
    if (editMode) {
      this.setState({ editMode: false });
    } else {
      this.setState({ editMode: true });
    }
  };

  calibrateHandler = () => {
    console.log("calibrating");
    const { editor_actions, history } = this.props;
    const { params } = this.props.match;
    console.log(this.props.match);
    editor_actions.calibrate(params.id).then(result => {
      history.push(`/editor/${result.value.data.id}`);
    });
  };

  getLayersButtons = () => {
    const { raster, classes } = this.props;
    const len = raster.length - 1;
    let ms = [];
    for (let i = 0; i < len; i++) {
      ms.push(i);
    }

    return (
      <div>
        <ListItem
          button
          key={6}
          className={classes.nested}
          onClick={this.handleLayerButton(len)}
        >
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          <ListItemText primary={"RGB Composite"} />
        </ListItem>
        {ms.map((image, index) => (
          <ListItem
            button
            key={index}
            className={classes.nested}
            onClick={this.handleLayerButton(index)}
          >
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText primary={"Layer: " + (index + 1)} index={index} />
          </ListItem>
        ))}
      </div>
    );
  };

  handleLayerButton = index => async e => {
    const { raster } = this.props;
    // this.canvas.clear();
    this.canvas.remove(raster[index]);
    let image = await this.load_layer(raster[index]);
    this.canvas.add(image);
    this.canvas.setActiveObject(image);
    this.canvas.renderAll();
  };

  render() {
    const { open_tools, advanced_tools } = this.state;
    const { classes, is_loading } = this.props;
    return (
      <PageWrapper {...this.props}>
        <canvas id="c" width="1" height="1" />
        <Tooltip title="Edit options">
          <Fab
            color="primary"
            style={{
              margin: 0,
              top: "auto",
              right: 1180,
              bottom: 50,
              left: "auto",
              position: "fixed"
            }}
            onClick={this.renderButton}
          >
            <EditIcon />
          </Fab>
        </Tooltip>
        <Zoom
          key={"primary"}
          in={open_tools}
          style={{
            transitionDelay: `180ms`
          }}
          unmountOnExit
        >
          <div>
            <Tooltip title="Add Polygon" placement="right-start">
              <Fab
                color="primary"
                aria-label="add"
                style={{
                  margin: 0,
                  top: "auto",
                  right: 1187,
                  bottom: 110,
                  left: "auto",
                  position: "fixed"
                }}
                size="small"
                onClick={() => this.renderButton}
              >
                <PhotoSizeSelectSmallIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Zoom +/-" placement="right-start">
              <Fab
                color="primary"
                aria-label="add"
                style={{
                  margin: 0,
                  top: "auto",
                  right: 1187,
                  bottom: 154,
                  left: "auto",
                  position: "fixed"
                }}
                size="small"
                onClick={this.activateZoom}
              >
                <ZoomInIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Advanced Tools" placement="right-start">
              <Fab
                color="primary"
                aria-label="add"
                style={{
                  margin: 0,
                  top: "auto",
                  right: 1187,
                  bottom: 198,
                  left: "auto",
                  position: "fixed"
                }}
                size="small"
                onClick={this.openAdvancedTools}
              >
                <WidgetsIcon />
              </Fab>
            </Tooltip>
          </div>
        </Zoom>
        <Drawer
          anchor="right"
          open={advanced_tools}
          onClose={this.openAdvancedTools}
        >
          <div
            className={classes.list}
            role="presentation"
            // onClick={this.openAdvancedTools}
            // onKeyDown={this.openAdvancedTools}
          >
            <List>
              <ListItem key={"Advanced Tools"}>
                <ListItemText primary={"Advanced Tools Menu"} />
              </ListItem>
              <Divider />
              <ListItem
                button
                key={"Calibrate"}
                onClick={this.calibrateHandler}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={"Calibrate Mosaic"} />
              </ListItem>
              <ListItem button key={"Extract Features"}>
                <ListItemIcon>
                  <ViewComfyIcon />
                </ListItemIcon>
                <ListItemText primary={"Extract Features"} />
              </ListItem>
              <Divider />
              <ListItem key={"Raster Controls"}>
                <ListItemText primary={"Raster Controls"} />
              </ListItem>
              <ListItem button key={"Layers"}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary={"Layers"} />
              </ListItem>
              {this.getLayersButtons()}
              <ListItem button key={"VI's"}>
                <ListItemIcon>
                  <EcoIcon />
                </ListItemIcon>
                <ListItemText primary={"VI's"} />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <Loading open={is_loading} />
      </PageWrapper>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    is_loading: store.editor_reducer.is_loading,
    raster: store.editor_reducer.raster
  };
};
const mapDispatchToProps = dispatch => {
  return {
    mosaic_actions: bindActionCreators(mosaic_actions, dispatch),
    editor_actions: bindActionCreators(editor_actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTheme(EditorPage)));
