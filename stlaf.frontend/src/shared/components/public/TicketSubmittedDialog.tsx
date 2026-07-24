import {
  Snackbar,
  Alert,
  Stack,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

import type { TicketDto } from "../../../departments/IT/types/ticket";

interface Props {
  open: boolean;
  ticket: TicketDto | null;
  onClose: () => void;
}

export default function TicketSubmittedToast({
  open,
  ticket,
  onClose,
}: Props) {
  if (!ticket) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={8000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={{
          width: "380px",
          bgcolor: "#1A2634",
          color: "white",
          "& .MuiAlert-icon": {
            color: "#CCAA49",
          },
        }}
      >
        <Stack spacing={1.5}>
          <Typography
            fontWeight={700}
            fontSize={16}
          >
            Ticket Submitted Successfully
          </Typography>

          <Typography variant="body2">
            Your support request has been received.
          </Typography>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />

          <Typography variant="body2">
            Ticket Number
          </Typography>

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: "#CCAA49",
            }}
          >
            {ticket.ticketNumber}
          </Typography>

          <Chip
            label={ticket.status}
            size="small"
            sx={{
              width: "fit-content",
              bgcolor: "white",
              color: "#1A2634",
              fontWeight: 600,
            }}
          />

          <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />

          <Typography variant="body2">
            <strong>Category:</strong> {ticket.category}
          </Typography>

          <Typography variant="body2">
            <strong>Priority:</strong> {ticket.priority}
          </Typography>

          <Typography variant="body2">
            <strong>Email:</strong> {ticket.companyEmail}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              opacity: 0.8,
            }}
          >
            Please keep your ticket number for tracking your request.
          </Typography>
        </Stack>
      </Alert>
    </Snackbar>
  );
}
