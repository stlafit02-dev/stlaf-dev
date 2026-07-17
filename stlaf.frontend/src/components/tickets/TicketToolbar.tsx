import {
  Stack,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  search: string;
  status: string;
  priority: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

export default function TicketToolbar({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}: Props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      mb={3}
      alignItems="center"
      flexWrap="wrap"
    >
      <TextField
        label="Search"
        size="small"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <TextField
        select
        label="Status"
        size="small"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Open">Open</MenuItem>
        <MenuItem value="InProgress">In Progress</MenuItem>
        <MenuItem value="Resolved">Resolved</MenuItem>
        <MenuItem value="Closed">Closed</MenuItem>
      </TextField>

      <TextField
        select
        label="Priority"
        size="small"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Critical">Critical</MenuItem>
      </TextField>

      <Button
        variant="contained"
        component={Link}
        to="/tickets/new"
      >
        Create Ticket
      </Button>
    </Stack>
  );
}