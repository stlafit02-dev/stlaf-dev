import { useState } from "react";
import { Typography } from "@mui/material";
import type { GridPaginationModel } from "@mui/x-data-grid";

import TicketToolbar from "../../components/tickets/TicketToolbar";
import TicketTable from "../../components/tickets/TicketTable";
import { useTickets } from "../../hooks/useTickets";
import TicketDetailsDialog from "../../components/tickets/TicketDetailsDialog";
import type { TicketDto } from "../../types/ticket";

export default function TicketListPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading } = useTickets({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    search,
    status: status || undefined,
    priority: priority || undefined,
    sortBy: "DateSubmitted",
    descending: true,
  });
  console.log("Ticket query running...");
  console.log(data);
  console.log(isLoading);

  const [selectedTicket, setSelectedTicket] = useState<TicketDto | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Typography variant="h4" fontWeight={700} mb={3}>
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
    </>
  );
}
