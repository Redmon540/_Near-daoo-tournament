import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { formatNearAmount, login, logout } from "./utils";

import getConfig from "./config";
import SignIn from "./components/SignIn";
import { AppBar, Box, Button, Container, createTheme, Fab, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Route, Routes } from "react-router-dom";
import Tournament from "./components/Tournament";
import Tournaments from "./components/Tournaments";
import AddTournament from "./components/AddTournament";
import AddIcon from "@mui/icons-material/Add";

const { networkId } = getConfig(process.env.NODE_ENV || "development");

// const balance =

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Roboto", "Helvetica Neue", "Arial", "sans-serif"].join(","),
  },
});

export default function App(props) {
  const [openModal, setOpenModal] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const user = window.contract.account.accountId;

  if (!window.walletConnection.isSignedIn()) {
    return (
      <>
        <SignIn />
      </>
    );
  }

  async function getBalance() {
    window.contract.account.getAccountBalance().then((res) => {
      setAccountInfo(res);
    });
  }

  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      getBalance();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {window.walletConnection.isSignedIn() && (
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> */}
            <Button
              sx={{ color: "white" }}
              onClick={() => {
                window.location.pathname = "/";
              }}
            >
              tournament-dApp
            </Button>
            <Typography>{user}</Typography>
            <Typography>{`${formatNearAmount(accountInfo.available)}`}</Typography>

            <Button color="inherit" onClick={logout}>
              logout
            </Button>
          </Toolbar>
        </AppBar>
      )}
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Tournaments />} />
            <Route path="/tournament/:tournamentId" element={<Tournament />} />
          </Routes>
          <Fab
            sx={{
              position: "fixed",
              bottom: (theme) => theme.spacing(2),
              right: (theme) => theme.spacing(2),
            }}
            color="primary"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Container>
      <AddTournament open={openModal} handleClose={() => setOpenModal(false)} />
    </ThemeProvider>
  );
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`;
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {" " /* React trims whitespace around tags; insert literal space character when needed */}
      called method: 'setGreeting' in contract:{" "}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  );
}
