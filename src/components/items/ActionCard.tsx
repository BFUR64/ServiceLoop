import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  BookmarkBorderOutlined,
  BookmarkOutlined,
  ChatOutlined,
  CheckOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface ActionProp {
  vehicleId: string;
  itemId: string;
  priority: boolean;
  information: React.ReactNode;
}

function ActionCard({ vehicleId, itemId, information, priority }: ActionProp) {
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
          <Button>
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
