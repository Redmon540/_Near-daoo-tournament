import { Alert, Snackbar } from "@mui/material";
import React from "react";

function CustomSnackbar(props) {
  return (
    <div>
      <Snackbar anchorOrigin={{ horizontal: "right", vertical: "top" }} open={props.open} onClose={props.handleClose}>
        <div>
          <Alert onClose={props.handleClose} severity={props.severity} sx={{ width: "100%" }}>
            <div>
              <p>{props.message}</p>
            </div>
          </Alert>
        </div>
      </Snackbar>
    </div>
  );
}

export default CustomSnackbar;
