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
  Container,
  Fab,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import AddTeam from "./AddTeam";
import Team from "./Team";
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
}));

function Home(props) {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [teams, setTeams] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getTeams();
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("User");
    props.history.push("/");
  };
  const handleControlScreen = () => {
    props.history.push("/control");
  };

  const getTeams = () => {
    firestore
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
            <Button color="inherit" onClick={() => {}}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={handleControlScreen}>
              Game Control
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Grid container component="main">
        <Grid container className={classes.gridContainer} md={12}>
          {teams.map((team) => {
            return (
              <Grid md={3} className={classes.teamContainer} key={team.id}>
                <Team team={team} />
              </Grid>
            );
          })}
        </Grid>

        <Fab
          color="primary"
          aria-label="add"
          className={classes.actionButton}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <AddTeam open={open} handleClose={handleClose} />
      </Grid>
    </Fragment>
  );
}

export default Home;
