import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function MultiActionAreaCard({ agreement }) {
  return (
    <Card
      sx={{
        border: "2px solid #20071c",
        background: "#130316",
        transition: "transform 0.4s",
        borderRadius: "10px",
        "&:hover": { border: "2px solid purple", background: "#130319" },
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "white" }}
          >
            Agreement ID: {agreement.id}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            Creator: {agreement.creator}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            Content: {agreement.content}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            Second Party Address: {agreement.secondPartyAddress}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button size="small" color="primary">
          Validate
        </Button>
        <Button size="small" color="primary">
          Print
        </Button>
      </CardActions>
    </Card>
  );
}
