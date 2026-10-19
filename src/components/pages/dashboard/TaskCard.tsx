import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import ActionCard from "./ActionCard";

interface TaskProp {
  vehicleId: string;
  currentOdometer: number;
  itemId: string;
  name: string;
  note: string | null;
  priority: boolean;
}

export function TaskCard({
  vehicleId,
  currentOdometer,
  itemId,
  note,
  name,
  priority,
}: TaskProp) {
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
        currentOdometer={currentOdometer}
        itemId={itemId}
        itemNote={note}
        itemType="task"
        priority={priority}
        information={<Typography>{name}</Typography>}
      />
    </Paper>
  );
}

export default TaskCard;
