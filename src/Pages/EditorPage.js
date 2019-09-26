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
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import { withStyles, withTheme } from "@material-ui/core";
import Loading from "../components/Loading";
import FileSaver from "file-saver";
import constants from "../Redux/constants";
import L from "leaflet";
import * as goo from "leaflet.gridlayer.googlemutant";
import WorkIcon from "@material-ui/icons/Work";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TimelineIcon from "@material-ui/icons/Timeline";
import DashboardIcon from "@material-ui/icons/Dashboard";

const styles = theme => ({
  list: {
    width: 250
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

const style = {
  width: "100%",
  height: "100vh"
};

class EditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_tools: false,
      advanced_tools: false,
      panning: false,
      editMode: false,
      mosaics: []
    };
  }
  componentDidMount() {
    const { editor_actions } = this.props;
    const { params } = this.props.match;
    let indices = {};
    editor_actions.getMosaicData(params.id).then(response => {
      console.log("vis", response);
      const { vis, bbox } = response.value.data;
      let bbox_inv = [[bbox[1], bbox[0]], [bbox[3], bbox[2]]];

      var satellite = L.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox.satellite",
          maxZoom: 25,
          accessToken:
            "pk.eyJ1IjoibWF2YWxkZXJyYW1hIiwiYSI6ImNrMHh2NmduaDA4eTkzbW81MzRucDR3ZWUifQ.cDdDtvBmT048Y83CjWCYmw"
        }
      );
      var streets = L.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox.streets",
          maxZoom: 25,
          accessToken:
            "pk.eyJ1IjoibWF2YWxkZXJyYW1hIiwiYSI6ImNrMHh2NmduaDA4eTkzbW81MzRucDR3ZWUifQ.cDdDtvBmT048Y83CjWCYmw"
        }
      );
      var google = L.gridLayer.googleMutant({
        type: "hybrid" // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
      });

      this.map = L.map("map", {
        center: [3.4982633, -76.3603093], //[3.4982633, -76.3603093],
        zoom: 20,
        layers: [satellite]
      });

      this.map.fitBounds(bbox_inv);

      var baseMaps = {
        Streets: streets,
        Hybrid: google,
        Satellite: satellite
      };
      vis.forEach(index_name => {
        var image = L.imageOverlay(
          `${constants.API_URI}/get_mosaic/${params.id}?vi=${index_name}`,
          bbox_inv
        ).addTo(this.map);
        indices[index_name] = image;
      });
      var layer_control = L.control
        .layers(indices, baseMaps)
        .addTo(this.map)
        .expand();
    });
  }

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
    editor_actions.calibrate(params.id).then(result => {
      history.push(`/editor/${result.value.data.id}`);
    });
  };

  extractFeatureshandler = () => {
    console.log("extracting ficturis");
    const { editor_actions } = this.props;
    const { params } = this.props.match;
    console.log("id", params.id);
    editor_actions.getFeatures(params.id).then(result => {
      let file = result.value.data;
      var file2 = new File([file], "report.csv", {
        type: "text/csv;charset=utf-8"
      });
      FileSaver.saveAs(file2);
    });
  };

  handleLayerButton = index => async e => {
    const { raster } = this.props;
    let image = await this.load_layer(raster[index]);
    this.canvas.clear();
    this.canvas.add(image);
    this.canvas.setActiveObject(image);
    this.canvas.renderAll();
  };

  handleVIButton = index => async e => {
    const { vis } = this.props;
    let image = await this.load_layer(vis[index]);
    this.canvas.clear();
    this.canvas.add(image);
    this.canvas.setActiveObject(image);
    this.canvas.renderAll();
  };

  handleClickOnProjectButton = () => {
    console.log("refreshing", this.props);
    const { history } = this.props;
    history.push("/");
  };

  handleGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { open_tools, mosaics } = this.state;
    const { is_loading } = this.props;
    console.log("bbox props", mosaics);
    //
    let buttons = [
      {
        handle: this.handleClickOnProjectButton,
        name: "Projects",
        icon: <WorkIcon />
      },
      {
        handle: this.handleGoBack,
        name: "Mosaics",
        icon: <DashboardIcon />
      },
      {
        handle: this.calibrateHandler,
        name: "Rad. Calibration",
        icon: <EqualizerIcon />
      },
      {
        handle: this.extractFeatureshandler,
        name: "Extract Features",
        icon: <TimelineIcon />
      }
    ];
    return (
      <PageWrapper {...this.props} drawer_buttons={buttons}>
        <div id="map" style={style}>
          <div
            style={{
              margin: 0,
              top: "auto",
              right: "auto",
              bottom: 50,
              left: "auto",
              position: "fixed"
            }}
          >
            <Tooltip title="Edit options">
              <Fab color="primary" onClick={this.renderButton} style={{}}>
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
              <div
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "justify-content": "center",
                  "align-items": "flex-start"
                  // vertical-align: top
                }}
              >
                <Tooltip title="Add Polygon" placement="right-start">
                  <Fab
                    color="primary"
                    aria-label="add"
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
                    size="small"
                    onClick={this.openAdvancedTools}
                  >
                    <WidgetsIcon />
                  </Fab>
                </Tooltip>
              </div>
            </Zoom>
          </div>
        </div>
        <Loading open={is_loading} />
      </PageWrapper>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    is_loading: store.editor_reducer.is_loading,
    raster: store.editor_reducer.raster,
    vis: store.editor_reducer.vis,
    names: store.editor_reducer.names,
    bbox: store.editor_reducer.bbox
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
