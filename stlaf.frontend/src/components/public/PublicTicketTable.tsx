import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress,
  Box,
  TableContainer,
  Paper,
  Tooltip,
  TablePagination,
} from "@mui/material";

import { useState } from "react";
import { usePublicTickets } from "../../hooks/useTickets";

export default function PublicTicketTable() {
  const { data = [], isLoading, error } = usePublicTickets();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Box p={3}>Failed to load tickets.</Box>;
  }

  const paginatedTickets = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <>
      <Box
        sx={{
          fontSize: 20,
          fontWeight: 700,
          mb: 1,
        }}
      >
        Live Queue
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          height: 550,
          maxHeight: 550,
          overflow: "auto",
        }}
      >
        <Table
          size="small"
          stickyHeader
          sx={{
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <strong>Ticket #</strong>
              </TableCell>

              <TableCell align="center">
                <strong>Date Submitted</strong>
              </TableCell>

              <TableCell align="center">
                <strong>Department</strong>
              </TableCell>

              <TableCell align="center">
                <strong>Description</strong>
              </TableCell>

              <TableCell align="center">
                <strong>Priority</strong>
              </TableCell>

              <TableCell align="center">
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedTickets
              .filter((ticket) => ticket.status !== "Closed")
              .map((ticket) => (
                <TableRow key={ticket.ticketNumber} hover>
                  <TableCell align="center">{ticket.ticketNumber}</TableCell>

                  <TableCell align="center">
                    {new Date(ticket.dateSubmitted).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="center">{ticket.department}</TableCell>

                  <TableCell align="center">
                    <Tooltip title={ticket.description} arrow placement="top">
                      <span
                        style={{
                          display: "block",
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                        }}
                      >
                        {ticket.description}
                      </span>
                    </Tooltip>
                  </TableCell>

                  {/* PRIORITY */}
                  <TableCell align="center">
                    <Chip
                      label={ticket.priority}
                      size="small"
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
                  </TableCell>

                  {/* STATUS */}
                  <TableCell align="center">
                    <Chip
                      size="small"
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
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[30, 50, 100]}
      /> */}
    </>
  );
}
