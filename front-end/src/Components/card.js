import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import FolderIcon from "@mui/icons-material/Folder";

export default function Card(props) {
  // Calculate the percentage
  const percen = Math.round((props.percentage + Number.EPSILON) * 100) / 100;
  const pers = percen <= 100 ? percen : 100;
  const IconPerformance = props.iconPerformance;

  return (
    <Paper
      sx={{
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
        position: "relative",
        border: "1px solid #000",
        padding: 2,
        width: "100%",
        margin: 2,
      }}
    >
      <Grid container>
        <Hidden only="sm">
          <Grid
            sx={{
              height: "100px",
              width: "100px",
              display: "flex",
              position: "absolute",
              zIndex: 1,
              top: -20,
              left: 12,
              color: "#blue",
              background: "white",
              border: "1px solid #000",
              borderRadius: "25%",
              justifyContent: "center",
              alignItems: "center",
              transform: "scale(0.8)", // Scale down the icon
              transition: "transform 0.2s", // Transition applies to all transformations (in and out)
              "&:hover": {
                transform: "scale(1)", // Scale up on hover
              },
            }}
          >
            <FolderIcon />
          </Grid>
        </Hidden>

        <Grid
          container
          justifyContent="flex-end"
          sx={{ padding: 1, margin: 1 }}
        ></Grid>
      </Grid>
      <Grid container>
        <Grid
          container
          justifyContent="flex-end"
          sx={{ padding: 1, margin: "16px 0" }}
        >
          <Typography variant="h6" align="left">
            {props.secondary != null ? props.secondary : "..."}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ color: "#000" }} />

      <Grid
        container
        justifyContent="flex-start"
        sx={{ padding: 1, margin: 1 }}
      >
        <Typography>
          <strong>{props.primary}</strong>
        </Typography>
      </Grid>
    </Paper>
  );
}
