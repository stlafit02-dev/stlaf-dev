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
import { useUsers } from "../../../../shared/hooks/useUser";
import type { TicketDto } from "../../types/ticket";

interface Props {
  open: boolean;
  ticket: TicketDto | null;
  onClose: () => void;
}

// Reusable styling snippet for the dark mode textfields
const darkTextFieldSx = {
  "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#FFFFFF" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
    "&:hover fieldset": { borderColor: "#FFFFFF" },
    "&.Mui-focused fieldset": { borderColor: "#FFFFFF" },
  },
};

// Reusable styling snippet for the dark mode Select inputs
const darkSelectSx = {
  color: "#FFFFFF",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#FFFFFF" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#FFFFFF" },
  ".MuiSvgIcon-root": { color: "#FFFFFF" },
  // Target the root disabled state container
  "&.Mui-disabled": {
    color: "#FFFFFF",
    "-webkit-text-fill-color": "#FFFFFF",
  },
  // Target the inner input element specifically when disabled
  "& .Mui-disabled": {
    "-webkit-text-fill-color": "#FFFFFF !important",
    color: "#FFFFFF !important",
  },
  "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  "&.Mui-disabled .MuiSvgIcon-root": {
    color: "rgba(255, 255, 255, 0.3)",
  },
};

export default function TicketDetailsDialog({ open, ticket, onClose }: Props) {
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const updateMutation = useUpdateTicket();
  const { data: users = [], isLoading: isUsersLoading } = useUsers();

  useEffect(() => {
    if (!ticket) return;

    setStatus(ticket.status || "");

    const rawAssignee = ticket.assignedToId || (ticket as any).assignedTo;

    if (!rawAssignee) {
      setAssignedTo("");
      return;
    }

    if (users.length > 0) {
      const target = String(rawAssignee).trim().toLowerCase();

      const matchedUser = users.find((user) => {
        const uId = String(user.userId || (user as any).id || "").toLowerCase();
        const uName = `${user.firstName} ${user.lastName}`.trim().toLowerCase();

        return uId === target || uName === target;
      });

      if (matchedUser) {
        const exactId = matchedUser.userId || (matchedUser as any).id;
        setAssignedTo(String(exactId));
      } else {
        setAssignedTo(String(rawAssignee));
      }
    } else {
      setAssignedTo(String(rawAssignee));
    }
  }, [ticket, users]);

  if (!ticket) return null;

  const isClosed = ticket.status === "Closed";

  const isAssignedUserInList = users.some(
    (user) => String(user.userId || (user as any).id) === assignedTo,
  );

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
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          height: 650,
          maxHeight: "90vh",
          width: "90vw",
          maxWidth: 800,
          backgroundColor: "#1A2634",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left Side: Title & Number */}
          <Box>
            <Typography color="common.white" fontSize={24} fontWeight={700}>
              Ticket Details
            </Typography>
            <Typography color="text.secondary">
              {ticket.ticketNumber}
            </Typography>
          </Box>

          {/* Right Side: Chips */}
          <Box display="flex" gap={1}>
            {/* PRIORITY CHIP */}
            <Chip
              label={ticket.priority}
              sx={{
                bgcolor:
                  ticket.priority === "Low"
                    ? "#DCFCE7"
                    : ticket.priority === "Medium"
                      ? "#FEF3C7"
                      : ticket.priority === "High"
                        ? "#FFF7ED"
                        : ticket.priority === "Urgent"
                          ? "#FEE2E2"
                          : "#F1F5F9",
                color:
                  ticket.priority === "Low"
                    ? "#166534"
                    : ticket.priority === "Medium"
                      ? "#92400E"
                      : ticket.priority === "High"
                        ? "#C2410C"
                        : ticket.priority === "Urgent"
                          ? "#B91C1C"
                          : "#475569",
                fontWeight: 600,
              }}
            />

            {/* STATUS CHIP */}
            <Chip
              label={
                ticket.status === "InProgress"
                  ? "In Progress"
                  : ticket.status === "OnHold"
                    ? "On Hold"
                    : ticket.status
              }
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                color:
                  ticket.status === "Open"
                    ? "#2563EB"
                    : ticket.status === "InProgress"
                      ? "#EA580C"
                      : ticket.status === "OnHold"
                        ? "#D97706"
                        : ticket.status === "Resolved"
                          ? "#15803D"
                          : ticket.status === "Closed"
                            ? "#64748B"
                            : "#475569",
                bgcolor:
                  ticket.status === "Open"
                    ? "#DBEAFE"
                    : ticket.status === "InProgress"
                      ? "#FFF7ED"
                      : ticket.status === "OnHold"
                        ? "#FEF3C7"
                        : ticket.status === "Resolved"
                          ? "#DCFCE7"
                          : ticket.status === "Closed"
                            ? "#E2E8F0"
                            : "#F1F5F9",
              }}
            />
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#FFFFFF" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={2}>
          {/* LEFT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography color="common.white" fontWeight={700} mb={2}>
              Requester Information
            </Typography>

            <TextField
              label="Requester"
              value={ticket.name}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              inputProps={{ style: { color: "#FFFFFF" } }}
              sx={darkTextFieldSx}
            />

            <TextField
              label="Company Email"
              value={ticket.companyEmail}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              inputProps={{ style: { color: "#FFFFFF" } }}
              sx={darkTextFieldSx}
            />

            <TextField
              label="Viber Number"
              value={ticket.viberNumber}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              inputProps={{ style: { color: "#FFFFFF" } }}
              sx={darkTextFieldSx}
            />

            <TextField
              label="Category"
              value={ticket.category}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              inputProps={{ style: { color: "#FFFFFF" } }}
              sx={darkTextFieldSx}
            />
          </Grid>

          {/* RIGHT */}
          {/* RIGHT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography color="common.white" fontWeight={700} mb={2}>
              Ticket Information
            </Typography>

            {/* STATUS FIELD */}
            {isClosed ? (
              <TextField
                label="Status"
                value="Closed"
                fullWidth
                margin="dense"
                InputProps={{ readOnly: true }}
                inputProps={{ style: { color: "#FFFFFF" } }}
                sx={darkTextFieldSx}
              />
            ) : (
              <FormControl fullWidth margin="dense">
                <InputLabel
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&.Mui-focused": { color: "#FFFFFF" },
                  }}
                >
                  Status
                </InputLabel>

                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                  sx={darkSelectSx}
                  MenuProps={{
                    PaperProps: {
                      sx: { backgroundColor: "#1A2634", color: "#FFFFFF" },
                    },
                  }}
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="InProgress">In Progress</MenuItem>
                  <MenuItem value="OnHold">On Hold</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            )}

            {/* ASSIGNED TO FIELD */}
            {isClosed ? (
              <TextField
                label="Assigned To"
                value={
                  users.find(
                    (u) => String(u.userId || (u as any).id) === assignedTo,
                  )
                    ? `${users.find((u) => String(u.userId || (u as any).id) === assignedTo)?.firstName} ${users.find((u) => String(u.userId || (u as any).id) === assignedTo)?.lastName}`
                    : assignedTo
                      ? `Unknown User (${assignedTo})`
                      : "Unassigned"
                }
                fullWidth
                margin="dense"
                InputProps={{ readOnly: true }}
                inputProps={{ style: { color: "#FFFFFF" } }}
                sx={darkTextFieldSx}
              />
            ) : (
              <FormControl fullWidth margin="dense">
                <InputLabel
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&.Mui-focused": { color: "#FFFFFF" },
                  }}
                >
                  Assigned To
                </InputLabel>

                <Select
                  value={assignedTo || ""}
                  label="Assigned To"
                  onChange={(e) => setAssignedTo(e.target.value)}
                  sx={darkSelectSx}
                  MenuProps={{
                    PaperProps: {
                      sx: { backgroundColor: "#1A2634", color: "#FFFFFF" },
                    },
                  }}
                >
                  <MenuItem value="">Unassigned</MenuItem>

                  {assignedTo && !isAssignedUserInList && (
                    <MenuItem value={assignedTo}>
                      {isUsersLoading
                        ? "Loading assigned user..."
                        : `Unknown User (${assignedTo})`}
                    </MenuItem>
                  )}

                  {users.map((user) => {
                    const uId = String(user.userId || (user as any).id);
                    return (
                      <MenuItem key={uId} value={uId}>
                        {user.firstName} {user.lastName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}

            <TextField
              label="Submitted"
              value={new Date(ticket.dateSubmitted).toLocaleString()}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              inputProps={{ style: { color: "#FFFFFF" } }}
              sx={darkTextFieldSx}
            />
          </Grid>

          {/* DESCRIPTION */}
          <Grid size={12}>
            <Typography color="common.white" fontWeight={700} mb={1}>
              Description
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              value={ticket.description}
              InputProps={{
                readOnly: true,
              }}
              inputProps={{ style: { color: "#FFFFFF" } }}
              sx={darkTextFieldSx}
            />
          </Grid>
        </Grid>
      </DialogContent>

      {!isClosed && (
        <>
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

          <DialogActions sx={{ p: 2 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={updateMutation.isPending}
              sx={{
                backgroundColor: "#123765",
                "&:hover": {
                  backgroundColor: "#1a4d8c",
                },
              }}
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
