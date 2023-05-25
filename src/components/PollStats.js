import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Star } from "@mui/icons-material";

const PollStats = ({ votes, percentage, userSelection = false }) => {
  return (
    <Card sx={{ height: 90 }} data-testid="pollStats">
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Votes received: {votes}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Percentage received: {percentage.toFixed(2)}%
          {userSelection && <Star color="primary" />}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PollStats;
