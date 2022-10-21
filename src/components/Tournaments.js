import { Button, Card, CardContent, CardMedia, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PaidIcon from "@mui/icons-material/Paid";
import CustomSnackbar from "./CustomSnackbar";
import { Box } from "@mui/system";

function Tournaments() {
  const [open, setOpen] = useState({ isOpen: false, message: "", severity: "info" });
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTournaments() {
    try {
      setLoading(true);
      window.contract.getTournaments().then((res) => {
        setState(res);
      });
    } catch (error) {
      setOpen({ isOpen: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getTournaments();
  }, []);
  console.log("state", state);

  return (
    <div className="mt-10">
      <div>
        <Stack spacing={2}>
          {state.map((element) => (
            <Card key={element?.id} className="flex flex-row">
              <CardMedia
                component="img"
                image={
                  // sample unsplash photo by Giorgio Trovato
                  // https://unsplash.com/photos/_XTY6lD8jgM
                  element.imageUrl ||
                  "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                }
                alt="tournament-photo"
                sx={{ backgroundAttachment: "fixed", maxWidth: 200 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <CardContent>
                  <div className="flex justify-between">
                    <Typography gutterBottom variant="h5" component="div">
                      {element?.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" color="text.secondary">
                      Publisher: {element.publisher}
                    </Typography>
                  </div>
                  <Divider sx={{ marginTop: "1.25rem", marginBottom: "1.25rem" }} />
                  <div className="flex justify-between">
                    <Typography variant="body1" color="text.secondary" overflow={"clip"}>
                      {element.description}
                    </Typography>
                    <div className="flex">
                      <div className="flex items-center mr-2">
                        <PaidIcon sx={{ color: "gold", marginRight: 1 }} />
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          style={{ dispay: "flex", flexDirection: "column", justifyContent: "center" }}
                        >
                          Tournament Fee : {element.tournamentFee}
                        </Typography>
                      </div>

                      <IconButton
                        variant="outlined"
                        onClick={() => {
                          window.location.pathname = `/tournament/${element.id}`;
                        }}
                      >
                        <ArrowForwardIcon sx={{ color: "blue" }} />
                      </IconButton>
                    </div>
                  </div>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Stack>

        <CustomSnackbar open={open.isOpen} handleClose={() => setOpen({ isOpen: false })} message={open.message} severity={open.severity} />
      </div>
    </div>
  );
}

export default Tournaments;
