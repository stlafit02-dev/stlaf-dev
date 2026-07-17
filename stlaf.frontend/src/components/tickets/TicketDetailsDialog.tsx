import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Paper,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useUpdateTicket } from "../../hooks/useUpdateTicket";

import type { TicketDto } from "../../types/ticket";
import { useUsers } from "../../hooks/useUser";

interface Props {
  open: boolean;
  ticket: TicketDto | null;
  onClose: () => void;
}

export default function TicketDetailsDialog({ open, ticket, onClose }: Props) {
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const updateMutation = useUpdateTicket();
  const { data: users = [] } = useUsers();

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setAssignedTo(ticket.assignedToId ?? "");
    }
  }, [ticket]);

  if (!ticket) return null;

  const handleSave = async () => {
    if (!ticket) return;

    try {
      await updateMutation.mutateAsync({
        id: ticket.ticketId,
        payload: {
          status,
          assignedTo: assignedTo || null,
        },
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          bgcolor: "#1A2634",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 700,
        }}
      >
        Ticket #{ticket.ticketId.substring(0, 8).toUpperCase()}
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          bgcolor: "#F8F9FA",
          py: 3,
        }}
      >
        <Stack spacing={3} mt={1}>
          {/* Requester */}
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                pb: 1,
                borderBottom: "2px solid #CCAA49",
                color: "#1A2634",
              }}
            >
              Requester Information
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Name"
                value={ticket.name}
                InputProps={{ readOnly: true }}
              />

              <TextField
                label="Company Email"
                value={ticket.companyEmail}
                InputProps={{ readOnly: true }}
              />

              <TextField
                label="Viber Number"
                value={ticket.viberNumber}
                InputProps={{ readOnly: true }}
              />
            </Stack>
          </Paper>

          {/* Ticket */}
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                pb: 1,
                borderBottom: "2px solid #CCAA49",
                color: "#1A2634",
              }}
            >
              Ticket Information
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Ticket Number"
                value={
                  ticket.ticketNumber?.trim()
                    ? ticket.ticketNumber
                    : ticket.ticketId.substring(0, 8).toUpperCase()
                }
                InputProps={{ readOnly: true }}
              />

              <TextField
                label="Category"
                value={ticket.category ?? "-"}
                InputProps={{ readOnly: true }}
              />

              <TextField
                label="Priority"
                value={ticket.priority}
                InputProps={{ readOnly: true }}
              />

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>

                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="InProgress">In Progress</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Assigned To</InputLabel>

                <Select
                  value={assignedTo}
                  label="Assigned To"
                  onChange={(e) => setAssignedTo(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Unassigned</em>
                  </MenuItem>

                  {users.map((user) => (
                    <MenuItem key={user.userId} value={user.userId}>
                      {user.firstName} {user.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Paper>

          {/* Description */}
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                pb: 1,
                borderBottom: "2px solid #CCAA49",
                color: "#1A2634",
              }}
            >
              Description
            </Typography>

            <TextField
              value={ticket.description}
              multiline
              rows={6}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Paper>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={updateMutation.isPending}
          sx={{
            bgcolor: "#1A2634",
            px: 4,
            "&:hover": {
              bgcolor: "#15202B",
            },
          }}
        >
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
