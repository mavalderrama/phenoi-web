import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { reduxForm } from "redux-form";

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

class MediaCard extends Component {
  constructor(props) {
    super(props);
  }

  handleClickOnCard = event => {
    console.log("click on card", event);
  };

  handleClickOnDelete = () => {
    console.log("click on delete on card");
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
        <CardActionArea onClick={this.handleClickOnCard}>
          <CardMedia className={classes.media} image={imageC} title={titleC} />
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
          <Button
            size="small"
            color="primary"
            onClick={this.handleClickOnDelete}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(MediaCard);
