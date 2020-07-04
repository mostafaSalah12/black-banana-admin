import React, { Fragment, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, TextField } from "@material-ui/core";
import * as moment from "moment";
import * as randomaize from "randomatic";
import TeamModel from "../Models/team-model";
import { firestore } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const useStyles = makeStyles((theme) => ({
  addButton: {
    color: "green",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
    marginTop: 24,
  },
}));

function AddTeam({ open, handleClose }) {
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [startDate, setStartDate] = useState(null);

  const validationError = () =>
    toast.error("Please Add A Valid team count and date", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

  const error = () =>
    toast.error("Ops something went wrong", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

  const success = () =>
    toast.success("Teams added succefully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

  const handleChangeForm = async (e) => {
    const { name, value } = e.currentTarget;
    if (name === "number-of-teams") {
      setNumberOfTeams(value);
    } else if (name === "datetime-local") {
      setStartDate(value);
    }
  };

  const handleAddTeams = (e) => {
    e.preventDefault();
    if (startDate && numberOfTeams > 0) {
      const batch = firestore.batch();
      for (let i = 0; i < numberOfTeams; i++) {
        const startRoundOne = moment(startDate).format("YYYY-MM-DD HH:mm A");
        const endRoundOne = moment(startDate)
          .add(45, "minutes")
          .format("YYYY-MM-DD HH:mm A");
        const stratRoundTwo = moment(startDate)
          .add(45, "minutes")
          .format("YYYY-MM-DD HH:mm A");
        const endRoundTwo = moment(startDate)
          .add(120, "minutes")
          .format("YYYY-MM-DD HH:mm A");
        const stratRoundThree = moment(startDate)
          .add(120, "minutes")
          .format("YYYY-MM-DD HH:mm A");
        const endRoundThree = moment(startDate)
          .add(150, "minutes")
          .format("YYYY-MM-DD HH:mm A");
        const id = randomaize("0", 6);
        batch.set(
          firestore.collection("teams").doc(id),
          new TeamModel(
            id,
            startRoundOne,
            endRoundOne,
            stratRoundTwo,
            endRoundTwo,
            stratRoundThree,
            endRoundThree
          )
        );
      }

      batch
        .commit()
        .then((res) => {
          success();
          handleClose();
        })
        .catch((err) => {
          error();
          handleClose();
        });
    } else {
      validationError();
    }
  };

  const classes = useStyles();
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add New Team"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please choose start date:
            <form className={classes.container} noValidate>
              <TextField
                className={classes.textField}
                id="number-of-teams"
                name="number-of-teams"
                label="Number Of Teams"
                variant="outlined"
                type="number"
                onChange={handleChangeForm}
              />
              <TextField
                id="datetime-local"
                name="datetime-local"
                label="Start Date"
                type="datetime-local"
                defaultValue={new Date().toString()}
                className={classes.textField}
                onChange={handleChangeForm}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            cancel
          </Button>
          <Button
            onClick={handleAddTeams}
            autoFocus
            className={classes.addButton}
          >
            Add Team
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer closeOnClick rtl={false} position="top-right" />
    </Fragment>
  );
}

export default AddTeam;
