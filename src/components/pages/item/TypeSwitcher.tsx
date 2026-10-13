import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface TypeSwitcherProp {
  isTaskItem: boolean;
  setTaskItem: React.Dispatch<React.SetStateAction<boolean>>;
}

function TypeSwitcher({ isTaskItem, setTaskItem }: TypeSwitcherProp) {
  const type = isTaskItem ? "task" : "maintenance";

  return (
    <Stack>
      <Typography variant="h2" sx={{ fontSize: "1.25rem", fontWeight: 500 }}>
        Item Type
      </Typography>
      <FormControl>
        <RadioGroup
          row
          value={type}
          onChange={(_, value) => setTaskItem(value === "task")}
        >
          <FormControlLabel
            control={<Radio />}
            value="maintenance"
            label="Maintenance"
          />
          <FormControlLabel control={<Radio />} value="task" label="Task" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}

export default TypeSwitcher;
