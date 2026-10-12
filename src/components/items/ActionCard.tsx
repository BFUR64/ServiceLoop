import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import {
  BookmarkBorderOutlined,
  BookmarkOutlined,
  ChatOutlined,
  CheckOutlined,
  EditOutlined,
} from "@mui/icons-material";

interface ActionProp {
  id: string;
  priority: boolean;
  information: React.ReactNode;
}

function ActionCard({ information, priority }: ActionProp) {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", width: "100%" }}
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

      <Stack direction="row" spacing={2}>
        <Tooltip title="View note">
          <IconButton>
            <ChatOutlined />
          </IconButton>
        </Tooltip>

        <Tooltip title={priority ? "Remove bookmark" : "Add bookmark"}>
          <IconButton>
            {priority ? <BookmarkOutlined /> : <BookmarkBorderOutlined />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit item">
          <IconButton>
            <EditOutlined />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

export default ActionCard;
