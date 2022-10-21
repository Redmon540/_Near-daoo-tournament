import React from "react";
import { login, logout } from "../utils";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "../index.css";
import { Button, Typography } from "@mui/material";

function SignIn() {
  return (
    <Container fixed>
      <Box sx={{ height: "100%" }}>
        <div className="flex">
          <div className="p-10 bg-white rounded-lg  mt-28">
            <Typography className="text-center" variant="h2">
              Welcome to NEAR!
            </Typography>
            <div>
              <Typography style={{ marginTop: "1.25rem" }}>
                To make use of the NEAR blockchain, you need to sign in. The button below will sign you in using NEAR Wallet.
              </Typography>
              <Typography style={{ marginTop: "1.25rem" }}>
                By default, when your app runs in "development" mode, it connects to a test network ("testnet") wallet. This works just like the main
                network ("mainnet") wallet, but the NEAR Tokens on testnet aren't convertible to other currencies – they're just for testing!
              </Typography>
              <Typography style={{ marginTop: "1.25rem", textAlign: "center" }}>Go ahead and click the button below to try it out</Typography>
            </div>
            <Typography style={{ textAlign: "center", marginTop: "2.5em" }}>
              <Button variant="contained" onClick={login}>
                SignIn
              </Button>
            </Typography>
          </div>
        </div>
      </Box>
    </Container>
  );
}

export default SignIn;
