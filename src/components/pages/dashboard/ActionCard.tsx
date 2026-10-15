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

interface ActionProp {
  vehicleId: string;
  itemId: string;
  itemType: "task" | "maintenance";
  priority: boolean;
  information: React.ReactNode;
}

function ActionCard({
  vehicleId,
  itemId,
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
          <IconButton>
            <CheckOutlined />
          </IconButton>
        </Tooltip>

        <Box sx={{ overflow: "auto", whiteSpace: "nowrap", minWidth: 0 }}>
          {information}
        </Box>
      </Stack>

      <ButtonGroup variant="text" sx={{ alignItems: "center" }}>
        <Tooltip title="View note">
          <Button>
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

export default ActionCard;
