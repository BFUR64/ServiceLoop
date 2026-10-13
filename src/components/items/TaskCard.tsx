import { Paper, Typography, useTheme } from "@mui/material";
import ActionCard from "./ActionCard";

interface TaskProp {
  vehicleId: string;
  itemId: string;
  name: string;
  priority: boolean;
}

export function TaskCard({ vehicleId, itemId, name, priority }: TaskProp) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: 1,
        borderColor: theme.palette.mode === "dark" ? "grey.700" : "grey.400",
      }}
    >
      <ActionCard
        vehicleId={vehicleId}
        itemId={itemId}
        priority={priority}
        information={<Typography>{name}</Typography>}
      />
    </Paper>
  );
}

export default TaskCard;
