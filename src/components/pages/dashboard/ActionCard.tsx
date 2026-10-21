import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlined from "@mui/icons-material/BookmarkOutlined";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import CheckOutlined from "@mui/icons-material/CheckOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import * as dataStorage from "../../../state/ServiceDataMemory";
import { setText } from "../../../hooks/useNotePopup";
import type { ItemType } from "../../../models/ServiceData";
import * as serviceData from "../../../state/ServiceDataMemory";
import { confirmPopup } from "../../../hooks/useConfirmPopup";

interface ActionProp {
  vehicleId: string;
  currentOdometer: number;
  itemId: string;
  itemNote: string | null;
  itemType: ItemType;
  priority: boolean;
  information: React.ReactNode;
}

function ActionCard({
  vehicleId,
  currentOdometer,
  itemId,
  itemNote,
  itemType,
  information,
  priority,
}: ActionProp) {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", minWidth: 0 }}
      >
        <Tooltip title="Mark as finished">
          <IconButton
            onClick={async () =>
              await markFinished({
                vehicleId,
                currentOdometer,
                itemId,
                itemType,
              })
            }
          >
            <CheckOutlined />
          </IconButton>
        </Tooltip>

        <Box sx={{ overflow: "auto", whiteSpace: "nowrap", minWidth: 0 }}>
          {information}
        </Box>
      </Stack>

      <ButtonGroup variant="text" sx={{ alignItems: "center" }}>
        <Tooltip title="View note">
          <Button
            onClick={() => {
              const toPrint =
                itemNote === "" || itemNote == null
                  ? "Add a note to see it here."
                  : itemNote;

              setText(`${toPrint}`);
            }}
          >
            <ChatOutlined
              sx={{
                color: theme.palette.mode === "dark" ? "white" : "grey.600",
              }}
            />
          </Button>
        </Tooltip>

        <Tooltip title={priority ? "Remove bookmark" : "Add bookmark"}>
          <Button
            onClick={() =>
              itemType === "task"
                ? dataStorage.updateTaskItem(vehicleId, itemId, {
                    priority: !priority,
                  })
                : dataStorage.updateMaintenanceItem(vehicleId, itemId, {
                    priority: !priority,
                  })
            }
          >
            {priority ? (
              <BookmarkOutlined
                sx={{
                  color: theme.palette.mode === "dark" ? "white" : "grey.600",
                }}
              />
            ) : (
              <BookmarkBorderOutlined
                sx={{
                  color: theme.palette.mode === "dark" ? "white" : "grey.600",
                }}
              />
            )}
          </Button>
        </Tooltip>

        <Tooltip title="Edit item">
          <Button
            onClick={() => navigate(`/vehicle/${vehicleId}/item/${itemId}`)}
          >
            <EditOutlined
              sx={{
                color: theme.palette.mode === "dark" ? "white" : "grey.600",
              }}
            />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Stack>
  );
}

interface MarkFinishedProp {
  vehicleId: string;
  currentOdometer: number;
  itemId: string;
  itemType: ItemType;
}

async function markFinished({
  vehicleId,
  currentOdometer,
  itemId,
  itemType,
}: MarkFinishedProp) {
  if (itemType === "task") {
    const confirmed = await confirmPopup(
      "Delete this task? This action cannot be undone.",
    );

    if (confirmed) {
      serviceData.removeTaskItem(vehicleId, itemId);
    }
  } else {
    const confirmed = await confirmPopup(
      "Mark this maintenance item as serviced? This will record the current date and odometer reading.",
    );

    if (confirmed) {
      serviceData.updateMaintenanceItem(vehicleId, itemId, {
        dateServiced: new Date().toISOString(),
        mileageServiced: currentOdometer,
      });
    }
  }
}

export default ActionCard;
