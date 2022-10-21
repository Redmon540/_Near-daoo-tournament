import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function AddTournament(props) {
  const [value, setValue] = useState({ name: "", tournamentFee: "", imgUrl: "", description: "" });

  async function createTournament(values) {
    try {
      window.contract.createTournament(values).then((res) => {
        props.handleClose();
        window.location.pathname = "/";
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (props?.data) {
      setValue(props.data);
    }
  }, [props.data]);

  async function updateTournament(id, values) {
    try {
      window.contract.updateTournamentContent({ ...values, TournamentID: id }).then((res) => {
        props.handleClose();
        window.location.pathname = `/tournament/${id}`;
      });
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit(data) {
    createTournament(data);
  }
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>{props.data ? "Edit Tournament" : "Create a Tournament"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Don't worry its free "just a gass fee 😊 "</DialogContentText>
          <div>
            <TextField
              margin="dense"
              id="name"
              value={value.name}
              label="Name"
              variant="outlined"
              sx={{ marginRight: 2 }}
              onChange={(x) => {
                setValue({ ...value, name: x.target.value });
              }}
            />
            <TextField
              type={"number"}
              margin="dense"
              value={value.tournamentFee}
              id="tournamentFee"
              label="Tournament Fee"
              variant="outlined"
              onChange={(x) => {
                setValue({ ...value, tournamentFee: x.target.value * 1 });
              }}
            />
          </div>

          <TextField
            margin="dense"
            id="imageUrl"
            value={value.imageUrl}
            label="Image Url"
            variant="outlined"
            fullWidth
            onChange={(x) => {
              setValue({ ...value, imageUrl: x.target.value });
            }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            value={value.description}
            fullWidth
            variant="outlined"
            onChange={(x) => {
              setValue({ ...value, description: x.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          {props?.data ? (
            <Button
              onClick={() => {
                updateTournament(props.data.id, value);
              }}
            >
              Edit
            </Button>
          ) : (
            <Button
              onClick={() => {
                onSubmit(value);
              }}
            >
              Publish
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTournament;
