import { useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";

import { createTicket } from "../../../departments/IT/api/ticketApi";
import { useCategories, usePriorities } from "../../hooks/useEnums";
import TicketSubmittedDialog from "./TicketSubmittedDialog";

import { useQueryClient } from "@tanstack/react-query";

import type { TicketDto } from "../../../departments/IT/types/ticket";

export default function PublicTicketForm() {
  const { data: categories = [], isLoading: loadingCategories } =
    useCategories();

  const { data: priorities = [], isLoading: loadingPriorities } =
    usePriorities();

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const [submittedTicket, setSubmittedTicket] = useState<TicketDto | null>(
    null,
  );

  const [form, setForm] = useState({
    name: "",
    companyEmail: "",
    viberNumber: "",
    department: "",
    category: "",
    priority: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const createdTicket = await createTicket(form);

      await queryClient.invalidateQueries({
        queryKey: ["publicTickets"],
      });

      setSubmittedTicket(createdTicket);

      setOpenDialog(true);

      setForm({
        name: "",
        companyEmail: "",
        viberNumber: "",
        department: "",
        category: "",
        priority: "",
        description: "",
      });
    } catch (err) {
      console.error("Ticket submission failed:", err);
      alert("Unable to submit ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack
        spacing={1.6}
        sx={{
          width: "100%",
          maxWidth: 420,
          mx: "auto",
          height: "100%",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Box
            sx={{
              width: 5,
              height: 28,
              bgcolor: "#1A2364",
              borderRadius: 999,
            }}
          />

          <Typography variant="h5" fontWeight={700} color="#1A2634">
            Create New Ticket
          </Typography>
        </Stack>

        <TextField
          size="small"
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          size="small"
          label="Company Email"
          name="companyEmail"
          value={form.companyEmail}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          size="small"
          label="Viber Number"
          name="viberNumber"
          type="tel"
          inputProps={{ maxLength: 11 }}
          value={form.viberNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setForm((prev) => ({
              ...prev,
              viberNumber: value,
            }));
          }}
          fullWidth
        />

        <TextField
          size="small"
          select
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="HumanResources">Human Resource Department</MenuItem>
          <MenuItem value="Litigation">Litigation Department</MenuItem>
          <MenuItem value="Corporate">Corporate Department</MenuItem>
          <MenuItem value="Accounting">Accounting Department</MenuItem>
          <MenuItem value="Marketing">Marketing Department</MenuItem>
          <MenuItem value="IT">IT Department</MenuItem>
        </TextField>

        <TextField
          size="small"
          select
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          fullWidth
          disabled={loadingCategories}
        >
          {loadingCategories ? (
            <MenuItem value="">
              <CircularProgress size={18} />
            </MenuItem>
          ) : (
            categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))
          )}
        </TextField>

        <TextField
          size="small"
          select
          label="Priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
          fullWidth
          disabled={loadingPriorities}
        >
          {loadingPriorities ? (
            <MenuItem value="">
              <CircularProgress size={18} />
            </MenuItem>
          ) : (
            priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))
          )}
        </TextField>

        <TextField
          size="small"
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />

        <Button
          variant="contained"
          fullWidth
          disabled={loading}
          onClick={handleSubmit}
          sx={{
            mt: 2,
            height: 48,
            bgcolor: "#123765",
            borderRadius: 2,
            fontWeight: 700,
            fontSize: 15,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#1A2364",
              boxShadow: "0 4px 12px rgba(26,35,100,.25)",
            },
          }}
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </Button>
      </Stack>

      <TicketSubmittedDialog
        open={openDialog}
        ticket={submittedTicket}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
}
