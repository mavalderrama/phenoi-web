import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import * as drawer_actions from "../Redux/actions/drawer_actions";
import { connect } from "react-redux";

const styles = () => ({
  card: {
    maxWidth: 500
  },
  media: {
    height: 140
  }
});

class MediaCard extends Component {
  handleClickOnCard = () => {
    console.log("card props", this.props);
    const { title, actions, type } = this.props;
    if (type === "PROJECT") {
      actions.getMosaics(title);
    } else if (type === "MOSAIC") {
      console.log("Open MOSAIC");
      actions.openMosaic(title);
    }
  };

  handleDelete = () => {
    console.log("delete card", this.props);
    const { id, title, actions, type, project } = this.props;
    if (type === "PROJECT") {
      console.log("DELETE PROJECT");
      actions.deleteProject(id, title).then(result => {
        if ("success" in result.value.data) {
          actions.getProjects();
        }
      });
    } else if (type === "MOSAIC") {
      console.log("DELETE MOSAIC");
      actions.deleteMosaic(id, project).then(result => {
        if ("success" in result.value.data) {
          actions.getMosaics(project);
        }
      });
    }
  };

  render() {
    const { title, image, details, classes } = this.props;
    const titleC = title || Date.now().toString();
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
            title={titleC}
            onClick={this.handleClickOnCard}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {titleC}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {detailsC}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={this.handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    projects: store.drawer_reducer.projects,
    expand_projects: store.drawer_reducer.expand_projects
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
