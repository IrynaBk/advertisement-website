import React from "react";
import { Alert } from "@mui/material";

function ErrorHandler({ error }) {
  return (
    <Alert data-testid="error-handler"
      severity="error"
      sx={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        backgroundColor: "#fce8e6",
        color: "#e07a5f",
        boxShadow: "0px 4px 12px rgba(224, 122, 95, 0.5)",
      }}
    >
      {error || error.message}
    </Alert>
  );
}

export default ErrorHandler;