import React, { Fragment, useState, useContext, useEffect } from "react";
import {
  Grid,
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  CssBaseline,
  Paper,
  Fab,
} from "@material-ui/core";
import Timer from "react-compound-timer";
import MenuIcon from "@material-ui/icons/Menu";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import { UserContext } from "../Providers/UserContext";
import { firestore } from "./firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  rootNav: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  actionButton: {
    position: "fixed",
    top: "75vh",
    right: "5vw",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  teamContainer: {
    margin: 4,
  },
  gridContainer: {
    marginTop: 16,
    marginLeft: 64,
    marginRight: 64,
  },
  buttonRoundOne: {
    backgroundColor: "#00e676",
    margin: 16,
    padding: 16,
    fontSize: "1.2rem",
  },
  buttonRoundTwo: {
    backgroundColor: "#ff9800",
    margin: 16,
    padding: 16,
    fontSize: "1.2rem",
  },
  buttonRoundThree: {
    backgroundColor: "#ff5722",
    margin: 16,
    padding: 16,
    fontSize: "1.2rem",
  },
  buttonEnd: {
    backgroundColor: "#e91e63",
    margin: 16,
    padding: 16,
    fontSize: "1.2rem",
  },
  styleTimer: {
    margin: 16,
    padding: 16,
    fontSize: "2rem",
    fontWeight: "700",
  },
}));

function Control(props) {
  const { setUser } = useContext(UserContext);
  const [timer, setTimer] = useState(null);
  const [teams, setTeams] = useState(null);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("User");
    props.history.push("/");
  };
  const handleDashboard = () => {
    props.history.push("/dashboard");
  };

  const handleStartRound1 = () => {
    if (teams) {
      teams.forEach((team) => {
        firestore
          .collection("teams")
          .doc(team.id)
          .update({
            activeRound: "Round 1",
            status: "Started",
            "round1.currentIndex": 0,
            "round1.startAt": new Date().toDateString(),
          })
          .then(() => {
            setTimer(
              <Timer>
                <Fragment>
                  Round One <Timer.Minutes /> : <Timer.Seconds />
                </Fragment>
              </Timer>
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };
  const handleStartRound2 = () => {
    if (teams) {
      teams.forEach((team) => {
        firestore
          .collection("teams")
          .doc(team.id)
          .update({
            activeRound: "Round 2",
            "round1.endAt": new Date().toDateString(),
            "round2.startAt": new Date().toDateString(),
          })
          .then(() => {
            setTimer(null);
            setTimer(
              <Timer initialTime={0}>
                <Fragment>
                  Round Two <Timer.Minutes /> : <Timer.Seconds />
                </Fragment>
              </Timer>
            );
          })
          .catch((err) => {});
      });
    }
  };
  const handleStartRound3 = () => {
    if (teams) {
      teams.forEach((team) => {
        firestore
          .collection("teams")
          .doc(team.id)
          .update({
            activeRound: "Round 3",
            "round3.currentIndex": 0,
            "round2.endAt": new Date().toDateString(),
            "round3.startAt": new Date().toDateString(),
          })
          .then(() => {
            setTimer(null);
            setTimer(
              <Timer initialTime={0}>
                <Fragment>
                  Round Three <Timer.Minutes /> : <Timer.Seconds />
                </Fragment>
              </Timer>
            );
          })
          .catch((err) => {});
      });
    }
  };

  const handleEndGame = () => {
    if (teams) {
      teams.forEach((team) => {
        let winner = true;
        if (
          !team.round1.q1.solved ||
          !team.round1.q2.solved ||
          !team.round1.q3.solved ||
          !team.round1.q4.solved ||
          !team.round1.q5.solved ||
          !team.round1.q6.solved ||
          !team.round1.q7.solved ||
          !team.round3.q1.solved ||
          !team.round3.q2.solved
        ) {
          winner = false;
        }
        firestore
          .collection("teams")
          .doc(team.id)
          .update({
            status: winner ? "Team Win" : "Team Lose",
            activeRound: "Finished",
            winner,
          })
          .then(() => {
            setTimer("Thank You!");
          })
          .catch((err) => {});
      });
    }
  };

  const getTimer = () => {
    return (
      <Timer>
        <Fragment>
          <Timer.Minutes /> : <Timer.Seconds />
        </Fragment>
      </Timer>
    );
  };
  const getTeams = () => {
    return firestore
      .collection("teams")
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const _teams = snapshot.docs.map((doc) => doc.data());
          setTeams(_teams);
        }
      });
  };

  useEffect(() => {
    getTeams();
  }, []);

  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.rootNav}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              ClueChase
            </Typography>
            <Button color="inherit" onClick={handleDashboard}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={() => {}}>
              Game Control
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Grid
        container
        component="main"
        justify="center"
        alignItems="center"
        className={classes.styleTimer}
      >
        {timer}
      </Grid>
      <Grid container component="main" justify="center" alignItems="center">
        <Grid
          container
          className={classes.gridContainer}
          md={8}
          component={Paper}
          elevation={6}
        >
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonRoundOne}
              startIcon={<DirectionsRunIcon />}
              onClick={handleStartRound1}
            >
              Start Round 1
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonRoundTwo}
              startIcon={<DirectionsBikeIcon />}
              onClick={handleStartRound2}
            >
              Start Round 2
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonRoundThree}
              startIcon={<GpsFixedIcon />}
              onClick={handleStartRound3}
            >
              Start Round 3
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonEnd}
              startIcon={<EmojiEventsIcon />}
              onClick={handleEndGame}
            >
              End The Game
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Control;
