import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TaskItem } from "../../../utils/FileHandler";
import type { TypeSwitcherProp } from "./TypeSwitcher";
import TypeSwitcher from "./TypeSwitcher";
import * as dataStorage from "../../../state/DataStorage.ts";

interface TaskDraft {
  name: string;
  note: string | null;
}

interface TaskEditFormProp {
  vehicleId: string;
  item: TaskItem | undefined;
  typeSwitcherProp: TypeSwitcherProp;
}

function TaskEditForm({ vehicleId, item, typeSwitcherProp }: TaskEditFormProp) {
  const [draft, setDraft] = useState<TaskDraft>(() => ({
    name: item?.name ?? "",
    note: item?.note ?? null,
  }));

  const navigate = useNavigate();

  return (
    <>
      <TextField
        label="Name"
        value={draft.name}
        onChange={(event) =>
          setDraft((previous) => ({ ...previous, name: event.target.value }))
        }
      />
      <TextField
        label="Note"
        value={draft.note ?? ""}
        onChange={(event) =>
          setDraft((previous) => ({
            ...previous,
            note: event.target.value,
          }))
        }
      />
      <TypeSwitcher {...typeSwitcherProp} />

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            if (item != null) {
              dataStorage.updateTaskItem(vehicleId, item.id, draft);
              navigate(`/dashboard/${vehicleId}`);
            } else {
              const newId = crypto.randomUUID();

              dataStorage.addTaskItem(vehicleId, {
                id: newId,
                priority: false,
                ...draft,
              });

              navigate(`/dashboard/${vehicleId}`);
            }
          }}
        >
          {item != null ? "Save Changes" : "Save Item"}
        </Button>
        {item != null && (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              dataStorage.removeTaskItem(vehicleId, item.id);
            }}
          >
            Delete Item
          </Button>
        )}
      </Stack>
    </>
  );
}

export default TaskEditForm;
