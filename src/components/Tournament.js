import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import React, { useEffect, useState } from "react";
import CustomSnackbar from "./CustomSnackbar";
import { utils } from "near-api-js";
import { Box } from "@mui/system";
import AddTournament from "./AddTournament";
import { parseNearAmount } from "../utils";

function Tournament() {
  const [open, setOpen] = useState({ isOpen: false, message: "", severity: "info" });
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState({ vote: false, apply: false });
  const [openModal, setOpenModal] = useState(false);
  const user = window.contract.account.accountId;

  async function applyTournament(id, fee) {
    setLoading({ ...loading, apply: true });
    try {
      window.contract.applyTournament({ TournamentID: id * 1 }, "300000000000000", parseNearAmount(fee)).then((res) => {
        setLoading({ ...loading, apply: false });
      });
    } catch (error) {
      setOpen({ isOpen: true, message: error.message, severity: "error" });
    }
  }

  async function removeApply(id, fee) {
    setLoading({ ...loading, apply: true });
    try {
      window.contract.removeApply({ TournamentID: id * 1 }).then((res) => {
        setLoading({ ...loading, apply: false });
      });
    } catch (error) {
      setOpen({ isOpen: true, message: error.message, severity: "error" });
    }
  }

  async function voteTournament(id, isVoteUp) {
    setLoading({ ...loading, vote: true });
    try {
      window.contract.voteTournament({ TournamentID: id * 1, isVoteUp: isVoteUp }).then((res) => {
        setOpen({ isOpen: true, message: res, severity: "info" });
        setLoading({ ...loading, vote: false });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getTournament(id) {
    try {
      window.contract.getTournament({ TournamentID: id * 1 }).then((res) => {
        setState(res);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTournament(id) {
    setLoading({ ...loading, apply: true });

    try {
      window.contract.deleteTournament({ TournamentID: id * 1 }).then((res) => {
        alert(res);
        setLoading({ ...loading, apply: false });
        window.location.pathname = "/";
      });
    } catch (error) {}
  }

  function checkApply(user) {
    if (state?.applicants) {
      const isApplicants = state.applicants.find((x) => x === user);
      if (isApplicants) {
        return true;
      } else {
        return false;
      }
    }
  }

  useEffect(() => {
    //catch id on url
    const id = window.location.pathname.split("/");
    getTournament(id[2]);
  }, [loading]);

  return (
    <div className="mt-10">
      <Card key={state.id}>
        <CardMedia
          component="img"
          image={
            // sample unsplash photo by Giorgio Trovato
            // https://unsplash.com/photos/_XTY6lD8jgM
            state.imageUrl ||
            "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          }
          alt="tournament-photo"
          sx={{ backgroundAttachment: "fixed" }}
        />
        <CardContent>
          <div className="flex justify-between">
            <Typography gutterBottom variant="h5" component="div">
              {state?.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div" color="text.secondary">
              Publisher: {state?.publisher}
            </Typography>
          </div>
          <div className="flex justify-end">
            {loading.vote ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
              <>
                <div className="flex justify-center flex-col">
                  <Typography>{state.vote}</Typography>
                </div>
                <Tooltip title="Vote Up">
                  <IconButton
                    onClick={() => {
                      voteTournament(state.id, true);
                    }}
                  >
                    <KeyboardArrowUpIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Vote Down">
                  <IconButton
                    onClick={() => {
                      voteTournament(state.id, false);
                    }}
                  >
                    <KeyboardArrowDownIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>

          <Divider sx={{ marginTop: "1.25rem", marginBottom: "1.25rem" }} />

          <Grid container spacing={2}>
            <Grid item xs={8} md={8}>
              <Typography variant="body1" color="text.secondary" overflow={"clip"}>
                {state?.description}
              </Typography>
            </Grid>
            <Grid item xs={8} md={10}>
              <Typography variant="body1" color="text.secondary">
                <PaidIcon sx={{ color: "gold", marginRight: 1 }} />
                Tournament Fee : {state?.tournamentFee}
              </Typography>
            </Grid>

            <Grid item xs={8} md={1}>
              {loading.apply ? (
                <CircularProgress />
              ) : (
                <>
                  {state.publisher !== user ? (
                    checkApply(user) ? (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          removeApply(state.id);
                        }}
                      >
                        Remove Apply
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          applyTournament(state.id, state.tournamentFee);
                        }}
                      >
                        Apply
                      </Button>
                    )
                  ) : (
                    <div>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ width: 85, marginBottom: 1 }}
                        onClick={() => {
                          deleteTournament(state.id);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ width: 85 }}
                        onClick={() => {
                          setOpenModal(true);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Grid>
          </Grid>
          <Typography variant="h6">Applicants</Typography>
          {state.applicants?.map((user) => (
            <List key={user}>{user}</List>
          ))}
        </CardContent>
      </Card>
      <AddTournament open={openModal} handleClose={() => setOpenModal(false)} data={state} />
      <CustomSnackbar open={open.isOpen} handleClose={() => setOpen({ isOpen: false })} message={open.message} severity={open.severity} />
    </div>
  );
}

export default Tournament;
