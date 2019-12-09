import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import { bindActionCreators } from "redux";
import * as drawer_actions from "../Redux/actions/drawer_actions";
import { connect } from "react-redux";

const styles = () => ({
  card: {
    maxWidth: 500,
    maxHeight: 1200
  },
  media: {
    height: 140
  }
});

class MediaCard extends Component {
  handleClickOnCard = event => {
    console.log("click on card open", this.props);
    console.log("event", event);
    const { clickOnOpenHandler, id, project } = this.props;
    clickOnOpenHandler(project, id);
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const { project, image, details, classes } = this.props;
    const imageC =
      image ||
      "https://images.unsplash.com/photo-1565234958677-53836561b971?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max";
    const detailsC = details || "No-details";
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={imageC}
            title={project}
            onClick={this.handleClickOnCard}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {project}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {detailsC}
            </Typography>
          </CardContent>
        </CardActionArea>
        {this.props.children}
      </Card>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    projects: store.drawer_reducer.projects,
    expand_projects: store.drawer_reducer.expand_projects,
    open_add_shapefile: store.drawer_reducer.open_add_shapefile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(drawer_actions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MediaCard));
