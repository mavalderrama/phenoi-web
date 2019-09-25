import React from "react";
import L from "leaflet";

const style = {
  width: "100%",
  height: "100vh"
};

class Map extends React.Component {
  componentDidMount() {
    // create map
    console.log("mounting map");
    const { center, bbox, mosaics } = this.props;
    console.log("bbox map", bbox);
    let bbox_inv = [[3.4982633, -76.3603093], [3.498, -76.36]];
    if (bbox !== null) {
      bbox_inv = [[bbox[0]], [bbox[1]]];
    }
    console.log("center", bbox_inv);
    console.log("center", bbox);
    this.map = L.map("map", {
      center: center, //[3.4982633, -76.3603093],
      zoom: 20,
      layers: [
        L.tileLayer(
          "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox.streets",
            maxZoom: 18,
            accessToken:
              "pk.eyJ1IjoibWF2YWxkZXJyYW1hIiwiYSI6ImNrMHh2NmduaDA4eTkzbW81MzRucDR3ZWUifQ.cDdDtvBmT048Y83CjWCYmw"
          }
        )
      ]
    });

    // this.map.setView([3.4982633, -76.3603093], 15);

    var test = L.imageOverlay(
      "http://127.0.0.1:5000/get_mosaic/15?vi=ndre",
      bbox_inv
    ).addTo(this.map);
    //
    // // let imageOverlay2 = L.imageOverlay("https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/1024px-Sydney_Opera_House_-_Dec_2008.jpg", [
    // //     [-30.8650, 151.2094],
    // //     [-32.865, 154.2094]
    // // ]).addTo(this.map);
    //
    // var test2 = L.imageOverlay(
    //   "https://raw.githubusercontent.com/mavalderrama/KalmanFilter/master/test.JPG",
    //   [[3.4617, -76.4893], [3.2968, -76.2455]]
    // ).addTo(this.map);
    //
    // test2.bringToBack();
    //
    var overlayMaps = {
      sidney: test
      // cali: test2
    };
    // add layer

    L.control.layers(null, overlayMaps).addTo(this.map);
    this.layer = L.layerGroup().addTo(this.map);
    // console.log("layer", this.map);
    // this.updateMarkers(this.props.markersData);
  }
  componentDidUpdate({ markersData }) {
    // check if data has changed
    // if (this.props.markersData !== markersData) {
    //   this.updateMarkers(this.props.markersData);
    // }
  }

  // updateMarkers(markersData) {
  //   this.layer.clearLayers();
  //   markersData.forEach(marker => {
  //     L.marker(marker.latLng, { title: marker.title }).addTo(this.layer);
  //   });
  // }
  render() {
    return <div id="map" style={style} />;
  }
}

export default Map;
