import { useState } from "react";
import { Box, Typography } from "@mui/material";

import TicketToolbar from "../../components/tickets/TicketToolbar";
import TicketTable from "../../components/tickets/TicketTable";
import TicketDetailsDialog from "../../components/tickets/TicketDetailsDialog";

import { useTickets } from "../../hooks/useTickets";
import type { TicketDto } from "../../types/ticket";

export default function TicketListPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [selectedTicket, setSelectedTicket] = useState<TicketDto | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  const { data, isLoading } = useTickets({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    search,
    status: status || undefined,
    priority: priority || undefined,
    sortBy: "DateSubmitted",
    descending: true,
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1700px",
        mx: "auto",
        px: 4,
        py: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: 700,
            color: "#123765",
          }}
        >
          Tickets
        </Typography>

        <TicketToolbar
          search={search}
          status={status}
          priority={priority}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
        />
      </Box>

      <TicketTable
        tickets={data?.data ?? []}
        loading={isLoading}
        totalRecords={data?.totalRecords ?? 0}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onView={(ticket) => {
          setSelectedTicket(ticket);
          setOpenDialog(true);
        }}
      />

      <TicketDetailsDialog
        open={openDialog}
        ticket={selectedTicket}
        onClose={() => setOpenDialog(false)}
      />
    </Box>
  );
}
