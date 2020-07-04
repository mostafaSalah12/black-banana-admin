import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: "1.2rem",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "600",
  },
  pos: {
    marginBottom: 12,
  },
  activeRound: {
    backgroundColor: "#91ff35",
    padding: 4,
    borderRadius: 4,
  },
  statusRoundInacative: {
    backgroundColor: "#ff3d00",
    padding: 4,
    borderRadius: 4,
  },
  statusRoundAcative: {
    backgroundColor: "#91ff35",
    padding: 4,
    borderRadius: 4,
  },
  statusMargin: {
    marginBottom: 8,
  },
  deleteButton: {
    color: "#ff3d00",
  },
});

function Team({ team }) {
  const classes = useStyles();
  return (
    <Fragment>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Team Code: {team.id}
          </Typography>
          <Typography variant="h5" component="h2"></Typography>
          <Typography className={classes.pos} color="textSecondary">
            start at : {team.round1.startAt}
          </Typography>
          <Typography variant="body2" component="p">
            <ul>
              <li className={classes.statusMargin}>
                <span className={classes.label}>Active Round:</span>{" "}
                <span className={classes.activeRound}>{team.activeRound}</span>
              </li>
              <li>
                <span className={classes.label}>Status:</span>{" "}
                <span
                  className={
                    team.status === "Not-Started" || team.status === "Team Lose"
                      ? classes.statusRoundInacative
                      : classes.statusRoundAcative
                  }
                >
                  {team.status}
                </span>
              </li>
              <hr />
              <li>
                <span className={classes.label}>Round One </span>{" "}
              </li>
              <li>
                <span className={classes.label}>Current Puzzle:</span>{" "}
                {team.round1.currentIndex + 1}
              </li>
              <hr />
              <li>
                <span className={classes.label}>Round Three </span>{" "}
              </li>
              <li>
                <span className={classes.label}>Current Puzzle:</span>{" "}
                {team.round3.currentIndex}
              </li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </Fragment>
  );
}

export default Team;
