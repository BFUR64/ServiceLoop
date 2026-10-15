import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TypeSwitcherProp } from "./TypeSwitcher";
import TypeSwitcher from "./TypeSwitcher";
import * as dataStorage from "../../../state/ServiceDataMemory.ts";
import { validateName } from "../../../utils/Validator.ts";
import type { TaskItem } from "../../../models/ServiceData.ts";

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

  const [nameMessage, setNameMessage] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <TextField
        label="Name"
        error={Boolean(nameMessage)}
        value={draft.name}
        helperText={nameMessage}
        onChange={(event) => {
          const text = event.target.value;
          setDraft((previous) => ({ ...previous, name: text }));
          setNameMessage(validateName(text));
        }}
      />
      <TextField
        label="Note"
        value={draft.note ?? ""}
        onChange={(event) =>
          setDraft((previous) => ({
            ...previous,
            note: event.target.value || null,
          }))
        }
      />
      <TypeSwitcher {...typeSwitcherProp} />

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            const error = validateName(draft.name);

            setNameMessage(error);

            if (error) {
              return;
            }

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
