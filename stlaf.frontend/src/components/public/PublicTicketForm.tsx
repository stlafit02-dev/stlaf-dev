import { useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import { createTicket } from "../../api/ticketApi";
import { useCategories, usePriorities } from "../../hooks/useEnums";
import TicketSubmittedDialog from "./TicketSubmittedDialog";

import { useQueryClient } from "@tanstack/react-query";

import type { TicketDto } from "../../types/ticket";

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
        spacing={1.5}
        sx={{
          width: "90%",
          mx: "auto",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            color: "#1A2634",
            mb: 1,
          }}
        >
          Create New Ticket
        </Typography>
        <TextField
          label="Employee Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Company Email"
          name="companyEmail"
          value={form.companyEmail}
          onChange={handleChange}
          // size="small"
          fullWidth
        />

        <TextField
          label="Viber Number"
          name="viberNumber"
          type="tel"
          // size="small"
          inputProps={{
            maxLength: 11,
          }}
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
          select
          label="Department"
          name="department"
          // size="small"
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
          select
          label="Category"
          name="category"
          // size="small"
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
          select
          label="Priority"
          name="priority"
          // size="small"
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
          label="Description"
          name="description"
          // size="small"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />

        <Button
          variant="contained"
          size="medium"
          disabled={loading}
          onClick={handleSubmit}
          sx={{
            mt: 2.5,
            width: "60%",
            mx: "auto",
            bgcolor: "#123765",
            "&:hover": {
              bgcolor: "#CCAA49",
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
