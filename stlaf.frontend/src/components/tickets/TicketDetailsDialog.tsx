import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid,
  Box,
  Divider,
  Chip,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { useUpdateTicket } from "../../hooks/useUpdateTicket";
import { useUsers } from "../../hooks/useUser";
import type { TicketDto } from "../../types/ticket";

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

  const isClosed = ticket.status === "Closed";

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        id: ticket.ticketId,
        payload: {
          status,
          assignedTo: assignedTo || null,
        },
      });

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          height: 720,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        <Box>
          <Typography fontSize={24} fontWeight={700}>Ticket Details</Typography>
          <Typography color="text.secondary">
            {ticket.ticketNumber}
          </Typography>
        </Box>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {/* LEFT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography fontWeight={700} mb={2}>
              Requester Information
            </Typography>

            <TextField
              label="Requester"
              value={ticket.name}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Company Email"
              value={ticket.companyEmail}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Viber Number"
              value={ticket.viberNumber}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Category"
              value={ticket.category}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* RIGHT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography fontWeight={700} mb={2}>
              Ticket Information
            </Typography>

            <Box display="flex" gap={1} mb={2}>
              <Chip label={ticket.priority} color="warning" />

              <Chip
                label={
                  ticket.status === "InProgress"
                    ? "In Progress"
                    : ticket.status === "OnHold"
                      ? "On Hold"
                      : ticket.status
                }
                color="primary"
              />
            </Box>

            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>

              <Select
                value={status}
                label="Status"
                disabled={isClosed}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Open">Open</MenuItem>

                <MenuItem value="InProgress">In Progress</MenuItem>

                <MenuItem value="OnHold">On Hold</MenuItem>

                <MenuItem value="Resolved">Resolved</MenuItem>

                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel>Assigned To</InputLabel>

              <Select
                value={assignedTo}
                label="Assigned To"
                disabled={isClosed}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <MenuItem value="">Unassigned</MenuItem>

                {users.map((user) => (
                  <MenuItem key={user.userId} value={user.userId}>
                    {user.firstName} {user.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Submitted"
              value={new Date(ticket.dateSubmitted).toLocaleString()}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* DESCRIPTION */}
          <Grid size={12}>
            <Typography fontWeight={700} mb={1}>
              Description
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={5}
              value={ticket.description}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      {!isClosed && (
        <>
          <Divider />

          <DialogActions sx={{ p: 2 }}>
            {/* <Button
              onClick={onClose}
              color="inherit"
            >
              Cancel
            </Button> */}

            <Button
              variant="contained"
              onClick={handleSave}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
